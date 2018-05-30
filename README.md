[![](https://img.shields.io/npm/v/express-query-parser.svg)](https://www.npmjs.com/package/express-query-parser)
[![](https://img.shields.io/npm/dt/express-query-parser.svg)](https://www.npmjs.com/package/express-query-parser)
![](https://img.shields.io/github/license/jackypan1989/express-query-parser.svg)
# Express-query-parser
In your express server, your may encounter req.query parse problem.  

1. nest query
```
GET http://localhost/?a=null&b=true&c[d]=false
// without parser
req.query = {a: 'null', b: 'true', c: {d: 'false'}}```
// with parser
req.query = {a: 'null', b: 'true', c: {d: 'false'}}
```

2. array query
```
GET http://localhost/?a[]=null&a[]=false
// without parser
req.query = {a: ['null', 'false']}
// with parser
req.query = {a: [null, false]}
```

## changelog
2018-05-17 (1.0.0): publish init version  
2018-05-29 (1.0.1): reduce size (177KB -> 17KB)  
2018-05-31 (1.0.2): support array

## feature
- [x] parse your query for null / boolean
- [x] support nested query
- [x] support array

## install
```
// use npm
npm install express-query-parser

// use yarn
yarn add express-query-parser
```

## usage
```
const queryParser = require('express-query-parser')
const express = require('express')
const app = express()

app.use(
  queryParser({
    parseNull: true,
    parseBoolean: true
  })
)
```

## options

### options.parseNull
convert all "null" to null
- type: boolean

### options.parseBoolean
convert all "true" to true / "false" to false
- type: boolean

Welcome any issues and PRs submit :D
