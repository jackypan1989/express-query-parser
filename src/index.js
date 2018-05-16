const R = require('ramda')

const parse = (obj, options) => 
  R.mapObjIndexed(val =>
    R.cond([
      // Object, call recusive
      [
        R.is(Object), 
        R.always(parse(val, options))
      ],
      // 'null' => null
      [
        R.allPass([
          _ => R.pathEq(['parseNull'], true, options),
          _ => R.equals('null', val)
        ]),
        R.always(null)
      ],
      // 'undefined' => undefined
      [
        R.allPass([
          _ => R.pathEq(['parseUndefined'], true, options),
          _ => R.equals('undefined', val)
        ]),
        R.always(undefined)
      ],
      // 'true' => true, 'false' => false
      [
        R.allPass([
          _ => R.pathEq(['parseBoolean'], true, options),
          _ => R.equals('true', val) || R.equals('false', val)
        ]),
        R.cond([
          [_ => R.equals('true', val), R.always(true)],
          [_ => R.equals('false', val), R.always(false)]
        ])
      ],
      [R.T, R.identity]
    ])(val)
  )(obj)

const queryParser = (options) => (req, res, next) => {
  req.query = parse(req.query, options)
  next()
}

module.exports = queryParser
module.exports.parse = parse

console.log(parse({
  a: 'null',
  b: 'undefined',
  c: 'true',
  d: {
    e: 'null',
    f: 'true'
  }
}, {
  parseNull: true,
  parseUndefined: true,
  parseBoolean: true
}))