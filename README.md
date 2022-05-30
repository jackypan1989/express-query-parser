[![](https://img.shields.io/npm/v/express-query-parser.svg)](https://www.npmjs.com/package/express-query-parser)
[![](https://img.shields.io/npm/dt/express-query-parser.svg)](https://www.npmjs.com/package/express-query-parser)
![](https://img.shields.io/github/license/jackypan1989/express-query-parser.svg)

# Express-query-parser
A parser helps you parse request for your express server. You may usually encounter some ```req.query``` issues like parsing ```'null'```, ```'true'``` and any numbered string. This parser covert them to the right type.

## scenarios

query with object
```js
// GET http://localhost/?a=null&b=true&c[d]=false&c[e]=3.14

// without this parser
req.query = {a: 'null', b: 'true', c: {d: 'false', e: '3.14'}}

// with this parser
req.query = {a: null, b: true, c: {d: false, e: 3.14}}
```

query with array
```js
// GET http://localhost/?a[]=null&a[]=false

// without this parser
req.query = {a: ['null', 'false']}

// with this parser
req.query = {a: [null, false]}
```

## changelog
2022-05-31 (1.3.3): add empty string convert  
2021-11-30 (1.3.2): add undefined convert  
2021-10-12 (1.3.0): bump version, add number convert  
2021-04-01 (1.2.0): bump version, only use esbuild and add type declarion  
2020-10-26 (1.1.0): rewrite to typescript and rollup  
2018-05-31 (1.0.2): support array  
2018-05-29 (1.0.1): reduce size (177KB -> 17KB)    
2018-05-17 (1.0.0): publish init version  

## feature
- [x] parse your query for null / boolean / undefined
- [x] support nested query
- [x] support array
- [x] support numbered string convert 

## install
```bash
# use yarn
yarn add express-query-parser

# use npm
npm i express-query-parser
```

## usage
```js
const { queryParser } = require('express-query-parser')
const express = require('express')
const app = express()

app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true
  })
)
```

## options

| field | desc | type | default |
|---|---|---|---|
| parseNull  | convert all ```"null"``` to ```null``` | ```boolean```  | ```true``` |
| parseUndefined  | convert all ```"undefined"``` to ```undefined``` | ```boolean```  | ```true``` |
| parseBoolean  | convert all ```"true"``` to ```true``` and ```"false"``` to ```false``` | ```boolean```  | ```true``` |
| parseNumber  | convert all numbered string to int and float | ```boolean```  | ```true``` |

---

**Welcome any issues and PRs submit :D**
