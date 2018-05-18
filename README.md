![](https://img.shields.io/npm/v/express-query-parser.svg)
![](https://img.shields.io/npm/dt/express-query-parser.svg)
![](https://img.shields.io/github/license/jackypan1989/express-query-parser.svg)
# Express-query-parser
In your express server, your may encounter req.query parse problem.   
Normally you may call http://localhost/?a=null&b=true&c[d]=false.   
And get ```req.query = {a: 'null', b: 'true', c: {d: 'false'}}```   

This project will help you parse to correct value.  
```req.query = {a: null, b: true, c: {d: false}}```

## changelog
2018-05-17 (1.0.0): publish init version

## feature
- [x] parse your query for null / boolean
- [x] support nested query

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
