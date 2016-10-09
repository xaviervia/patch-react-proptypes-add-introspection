# patch-react-proptypes-add-introspection

This hack (it's a nasty hack) adds metadata to `propTypes` so that information about the intended type structure can be extracted in runtime for arbitrary React Components using the default React PropTypes library. So, warnings ahead:

1. It only works for `React.PropTypes`. If the components you want to inspect are using custom `PropTypes` functions, `patch-react-proptypes-add-introspection` will not be able to extract useful information from them.
2. This is a hack. I can't stress this enough. My guess is that a future proof, trustworthy solution would involve a more formalized set of types, such as those derived from [Flow](https://flowtype.org/) (although if those would be inspectable in some way on runtime or would require some build step, I do not know).

## Install

```sh
npm install --save-dev patch-react-proptypes-add-introspection
```

## Usage

Since `patch-react-proptypes-add-introspection` literally patches the default `PropTypes` methods, this dependency needs to be loaded _before_ any Component meant to be introspected is loaded. For users of Babel, this means that you can't `import` your component files, since the order of files loaded with `import` is not guaranteed: instead, you need to use `require` explicitly, and at some point _after_ `patch-react-proptypes-add-introspection` was imported.

```js
import {introspect} from 'patch-react-proptypes-add-introspection'
const MyComponent = require('./MyComponent')

console.log(introspect(MyComponent.propTypes))
```

If your component was defined like this:

```js
import React, {PropTypes} from 'react'

export default function MyComponent () {
  return <div></div>
}

MyComponent.propTypes = {
  hasAny: PropTypes.any,
  hasAnyAndItsRequired: PropTypes.any.isRequired,
  anArrayPlease: PropTypes.array,
  anArrayPleaseAndItsRequired: PropTypes.array.isRequired,
  anArrayOfStuff: PropTypes.arrayOf(PropTypes.any),
  anArrayOfStuffAndItsRequired: PropTypes.arrayOf(PropTypes.any).isRequired,
  aBool: PropTypes.bool,
  aBoolAndItsRequired: PropTypes.bool.isRequired,
  anElement: PropTypes.element,
  anElementAndItsRequired: PropTypes.element.isRequired,
  aFunc: PropTypes.func,
  aFuncAndItsRequired: PropTypes.func.isRequired,
  anInstanceOf: PropTypes.instanceOf(Object),
  anInstanceOfAndItsRequired: PropTypes.instanceOf(Object).isRequired,
  aNode: PropTypes.node,
  aNodeAndItsRequired: PropTypes.node.isRequired,
  aNumber: PropTypes.number,
  aNumberAndItsRequired: PropTypes.number.isRequired,
  anObject: PropTypes.object,
  anObjectAndItsRequired: PropTypes.object.isRequired,
  anObjectOf: PropTypes.objectOf(PropTypes.array),
  anObjectOfAndItsRequired: PropTypes.objectOf(PropTypes.array).isRequired,
  isOneOf: PropTypes.oneOf(['a', 'b']),
  isOneOfAndItsRequired: PropTypes.oneOf(['c', 'd']).isRequired,
  isOneOfType: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  isOneOfTypeAndItsRequired: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  aShape: PropTypes.shape({ a: PropTypes.number, b: PropTypes.bool }),
  aShapeAndItsRequired: PropTypes.shape({ c: PropTypes.arrayOf(PropTypes.number) }).isRequired,
  aString: PropTypes.string,
  aStringAndItsRequired: PropTypes.string.isRequired,
  aSymbol: PropTypes.symbol,
  aSymbolAndItsRequired: PropTypes.symbol.isRequired
}
```

Then the output will be roughly:

```js
{
  hasAny: {type: 'any'},
  hasAnyAndItsRequired: {type: 'any', isRequired: true},
  anArrayPlease: {type: 'array'},
  anArrayPleaseAndItsRequired: {type: 'array', isRequired: true},
  anArrayOfStuff: {type: 'arrayOf', structure: {type: 'any'}},
  anArrayOfStuffAndItsRequired: {
    type: 'arrayOf',
    isRequired: true,
    structure: {type: 'any'}
  },
  aBool: {type: 'bool'},
  aBoolAndItsRequired: {type: 'bool', isRequired: true},
  anElement: {type: 'element'},
  anElementAndItsRequired: {type: 'element', isRequired: true},
  aFunc: {type: 'func'},
  aFuncAndItsRequired: {type: 'func', isRequired: true},
  anInstanceOf: {type: 'instanceOf', structure: Object},
  anInstanceOfAndItsRequired: {
    type: 'instanceOf',
    isRequired: true,
    structure: Object
  },
  aNode: {type: 'node'},
  aNodeAndItsRequired: {type: 'node', isRequired: true},
  aNumber: {type: 'number'},
  aNumberAndItsRequired: {type: 'number', isRequired: true},
  anObject: {type: 'object'},
  anObjectAndItsRequired: {type: 'object', isRequired: true},
  anObjectOf: {type: 'objectOf', structure: {type: 'array'}},
  anObjectOfAndItsRequired: {
    type: 'objectOf',
    isRequired: true,
    structure: {type: 'array'}
  },
  isOneOf: {type: 'oneOf', structure: ['a', 'b']},
  isOneOfAndItsRequired: {
    type: 'oneOf',
    isRequired: true,
    structure: ['c', 'd']
  },
  isOneOfType: {
    type: 'oneOfType',
    structure: [{type: 'bool'}, {type: 'number'}]
  },
  isOneOfTypeAndItsRequired: {
    type: 'oneOfType',
    isRequired: true,
    structure: [{type: 'bool'}, {type: 'number'}]
  },
  aShape: {
    type: 'shape',
    structure: {a: {type: 'number'}, b: {type: 'bool'}}
  },
  aShapeAndItsRequired: {
    type: 'shape',
    isRequired: true,
    structure: {c: {type: 'arrayOf', structure: {type: 'number'}}}
  },
  aString: {type: 'string'},
  aStringAndItsRequired: {type: 'string', isRequired: true},
  aSymbol: {type: 'symbol'},
  aSymbolAndItsRequired: {type: 'symbol', isRequired: true}
}
```

## License

[MIT License](LICENSE)
