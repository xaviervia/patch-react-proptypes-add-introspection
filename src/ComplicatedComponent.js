import React, {PropTypes} from 'react'

export default function ComplicatedComponent () {
  return <div></div>
}

ComplicatedComponent.propTypes = {
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
