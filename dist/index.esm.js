import { cond, type, map, mapObjIndexed, allPass, pathEq, equals, always, T, identity } from 'ramda';

const parse = (query, options) => cond([
  [
    (_) => type(query) === "Array",
    (_) => map((x) => parse(x, options), query)
  ],
  [
    (_) => type(query) === "Object",
    (_) => mapObjIndexed((x) => parse(x, options), query)
  ],
  [
    allPass([
      (_) => pathEq(["parseNull"], true, options),
      (_) => equals("null", query)
    ]),
    always(null)
  ],
  [
    allPass([
      (_) => pathEq(["parseBoolean"], true, options),
      (_) => equals("true", query) || equals("false", query)
    ]),
    cond([
      [(_) => equals("true", query), always(true)],
      [(_) => equals("false", query), always(false)]
    ])
  ],
  [
    T,
    identity
  ]
])(query);
const queryParser = (options) => (req, res, next) => {
  req.query = parse(req.query, options);
  next();
};

export { parse, queryParser };
