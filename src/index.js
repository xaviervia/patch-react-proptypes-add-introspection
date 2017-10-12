import PropTypes from 'prop-types'

const toPatch = [
  'arrayOf',
  'instanceOf',
  'objectOf',
  'oneOf',
  'oneOfType',
  'shape'
]

const wrap = (type, f) => function (...xs) {
  const result = f(...xs)
  result.type = type
  result.args = xs[0]

  result.isRequired.type = type
  result.isRequired.args = xs[0]
  result.isRequired.required = true

  return result
}

toPatch.forEach((method) => {
  PropTypes[method] = wrap(method, PropTypes[method])
})

const introspectValue = (value) => {
  if (value.type) {
    switch (value.type) {
      case 'arrayOf':
        return {
          type: 'arrayOf',
          structure: introspectValue(value.args),
          isRequired: !!value.required
        }

      case 'instanceOf':
        return {
          type: 'instanceOf',
          structure: value.args,
          isRequired: !!value.required
        }

      case 'objectOf':
        return {
          type: 'objectOf',
          structure: introspectValue(value.args),
          isRequired: !!value.required
        }

      case 'oneOf':
        return {
          type: 'oneOf',
          structure: value.args,
          isRequired: !!value.required
        }

      case 'oneOfType':
        return {
          type: 'oneOfType',
          structure: value.args.map(introspectValue),
          isRequired: !!value.required
        }

      case 'shape':
        return {
          type: 'shape',
          structure: introspect(value.args),
          isRequired: !!value.required
        }

      default:
        return {
          type: value.type,
          structure: 'unknown',
          isRequired: !!value.required
        }
    }
  }

  switch (value) {
    case PropTypes.any:
      return {
        type: 'any'
      }

    case PropTypes.any.isRequired:
      return {
        type: 'any',
        isRequired: true
      }

    case PropTypes.bool:
      return {
        type: 'bool'
      }

    case PropTypes.bool.isRequired:
      return {
        type: 'bool',
        isRequired: true
      }

    case PropTypes.array:
      return {
        type: 'array'
      }

    case PropTypes.array.isRequired:
      return {
        type: 'array',
        isRequired: true
      }

    case PropTypes.element:
      return {
        type: 'element'
      }

    case PropTypes.element.isRequired:
      return {
        type: 'element',
        isRequired: true
      }

    case PropTypes.func:
      return {
        type: 'func'
      }

    case PropTypes.func.isRequired:
      return {
        type: 'func',
        isRequired: true
      }

    case PropTypes.node:
      return {
        type: 'node'
      }

    case PropTypes.node.isRequired:
      return {
        type: 'node',
        isRequired: true
      }

    case PropTypes.number:
      return {
        type: 'number'
      }

    case PropTypes.number.isRequired:
      return {
        type: 'number',
        isRequired: true
      }

    case PropTypes.object:
      return {
        type: 'object'
      }

    case PropTypes.object.isRequired:
      return {
        type: 'object',
        isRequired: true
      }

    case PropTypes.string:
      return {
        type: 'string'
      }

    case PropTypes.string.isRequired:
      return {
        type: 'string',
        isRequired: true
      }

    case PropTypes.symbol:
      return {
        type: 'symbol'
      }

    case PropTypes.symbol.isRequired:
      return {
        type: 'symbol',
        isRequired: true
      }

    default:
      return {
        type: 'unknown'
      }
  }
}

export const introspect = (propTypes) =>
  Object
    .keys(propTypes)
    .reduce((cumulated, key) => ({
      ...cumulated,
      [key]: introspectValue(propTypes[key])
    }), {})
