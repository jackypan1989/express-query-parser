'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ramda = require('ramda');

const parse = (query, options) => ramda.cond([
  [
    (_) => ramda.type(query) === "Array",
    (_) => ramda.map((x) => parse(x, options), query)
  ],
  [
    (_) => ramda.type(query) === "Object",
    (_) => ramda.mapObjIndexed((x) => parse(x, options), query)
  ],
  [
    ramda.allPass([
      (_) => ramda.pathEq(["parseNull"], true, options),
      (_) => ramda.equals("null", query)
    ]),
    ramda.always(null)
  ],
  [
    ramda.allPass([
      (_) => ramda.pathEq(["parseBoolean"], true, options),
      (_) => ramda.equals("true", query) || ramda.equals("false", query)
    ]),
    ramda.cond([
      [(_) => ramda.equals("true", query), ramda.always(true)],
      [(_) => ramda.equals("false", query), ramda.always(false)]
    ])
  ],
  [
    ramda.T,
    ramda.identity
  ]
])(query);
const queryParser = (options) => (req, res, next) => {
  req.query = parse(req.query, options);
  next();
};

exports.parse = parse;
exports.queryParser = queryParser;
