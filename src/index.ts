import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParsedQuery = any

interface Options {
  parseNull?: boolean
  parseBoolean?: boolean
}

export const parse = (target: ParsedQuery, options: Options) : ParsedQuery => {
  switch (typeof (target)) {
    case 'string':
      if (options.parseNull && target === 'null') {
        return null
      } else if (options.parseBoolean && (target === 'true' || target === 'false')) {
        return target === 'true'
      } else {
        return target
      }
    case 'object':
      if (Array.isArray(target)) {
        return target.map(x => parse(x, options))
      } else {
        const obj = target
        Object.keys(obj).map(key =>
          obj[key] = parse(target[key], options)
        )
        return obj
      }
    default: 
      return target
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const queryParser = (options: Options) => (req: Request, res: Response, next: NextFunction) => {
  req.query = parse(req.query, options)
  next()
}
