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
      // else => return self
      [R.T, R.identity]
    ])(val)
  )(obj)

const queryParser = (options) => (req, res, next) => {
  req.query = parse(req.query, options)
  next()
}

module.exports = queryParser
module.exports.parse = parse