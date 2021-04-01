var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// src/index.ts
__markAsModule(exports);
__export(exports, {
  parse: () => parse,
  queryParser: () => queryParser
});
var parse = (target, options) => {
  switch (typeof target) {
    case "string":
      if (options.parseNull && target === "null") {
        return null;
      } else if (options.parseBoolean && (target === "true" || target === "false")) {
        return target === "true";
      } else {
        return target;
      }
    case "object":
      if (Array.isArray(target)) {
        return target.map((x) => parse(x, options));
      } else {
        const obj = target;
        Object.keys(obj).map((key) => obj[key] = parse(target[key], options));
        return obj;
      }
    default:
      return target;
  }
};
var queryParser = (options) => (req, res, next) => {
  req.query = parse(req.query, options);
  next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parse,
  queryParser
});
