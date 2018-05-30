import R from 'ramda'

const parse = (obj, options) =>
  R.cond([
    // Array, call recursive
    [
      _ => R.type(obj) === 'Array', 
      _ => R.map(x => parse(x, options), obj) 
    ],
    // Object, call recursive
    [
      _ => R.type(obj) === 'Object',
      _ => R.mapObjIndexed(x => parse(x, options), obj)
    ],
    // 'null' => null
    [
      R.allPass([
        _ => R.pathEq(['parseNull'], true, options),
        _ => R.equals('null', obj)
      ]),
      R.always(null)
    ],
    // 'true' => true, 'false' => false
    [
      R.allPass([
        _ => R.pathEq(['parseBoolean'], true, options),
        _ => R.equals('true', obj) || R.equals('false', obj)
      ]),
      R.cond([
        [_ => R.equals('true', obj), R.always(true)],
        [_ => R.equals('false', obj), R.always(false)]
      ])
    ],
    // others
    [
      R.T, 
      R.identity
    ] 
  ])(obj) 

const queryParser = (options) => (req, res, next) => {
  req.query = parse(req.query, options)
  next()
}

module.exports = queryParser
module.exports.parse = parse