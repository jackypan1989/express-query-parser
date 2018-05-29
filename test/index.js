const parse = require('./../dist/index').parse

console.log(parse({
  a: 'null',
  b: 'hello',
  c: 'true',
  d: {
    e: 'null',
    f: 'true'
  }
}, {
  parseNull: true,
  parseBoolean: true
}))