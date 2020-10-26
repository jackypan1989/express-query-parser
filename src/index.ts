import { NextFunction, Request, Response } from 'express'
import { T, allPass, always, cond, equals, identity, map, mapObjIndexed, pathEq, type } from 'ramda'

type Query = any

interface Options {
  parseNull?: boolean
  parseBoolean?: boolean
}

export const parse = (query: Query, options: Options) =>
  cond<Query, Query>([
    // Array, call recursive
    [
      _ => type(query) === 'Array',
      _ => map(x => parse(x, options), query)
    ],
    // Object, call recursive
    [
      _ => type(query) === 'Object',
      _ => mapObjIndexed(x => parse(x, options), query)
    ],
    // 'null' => null
    [
      allPass([
        _ => pathEq(['parseNull'], true, options),
        _ => equals('null', query)
      ]),
      always(null)
    ],
    // 'true' => true, 'false' => false
    [
      allPass([
        _ => pathEq(['parseBoolean'], true, options),
        _ => equals('true', query) || equals('false', query)
      ]),
      cond([
        [_ => equals('true', query), always(true)],
        [_ => equals('false', query), always(false)]
      ])
    ],
    // others
    [
      T,
      identity
    ]
  ])(query)

export const queryParser = (options: Options) => (req: Request, res: Response, next: NextFunction) => {
  req.query = parse(req.query, options)
  next()
}
