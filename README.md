[![](https://img.shields.io/npm/v/express-query-parser.svg)](https://www.npmjs.com/package/express-query-parser)
[![](https://img.shields.io/npm/dt/express-query-parser.svg)](https://www.npmjs.com/package/express-query-parser)
![](https://img.shields.io/github/license/jackypan1989/express-query-parser.svg)

# Express-query-parser
A parser helps you parse request for your express server. You may usually encounter some ```req.query``` issues like parsing ```'null'``` or ```'true'```. This parser covert them to the right type.

## scenarios

query with object
```js
// GET http://localhost/?a=null&b=true&c[d]=false

// without this parser
req.query = {a: 'null', b: 'true', c: {d: 'false'}}

// with this parser
req.query = {a: null, b: true, c: {d: false}}
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
2021-04-01 (1.2.0): bump version, only use esbuild and add type declarion   
2020-10-26 (1.1.0): rewrite to typescript and rollup  
2018-05-31 (1.0.2): support array  
2018-05-29 (1.0.1): reduce size (177KB -> 17KB)    
2018-05-17 (1.0.0): publish init version  

## feature
- [x] parse your query for null / boolean
- [x] support nested query
- [x] support array

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
    parseBoolean: true
  })
)
```

## options

| field | desc | type | default |
|---|---|---|---|
| parseNull  | convert all ```"null"``` to ```null``` | ```boolean```  | ```true``` |
| parseBoolean  | convert all ```"true"``` to ```true``` and ```"false"``` to ```false``` | ```boolean```  | ```true``` |

---

**Welcome any issues and PRs submit :D**
