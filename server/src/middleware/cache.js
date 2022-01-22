const flatCache = require('flat-cache');

let cache = flatCache.load('productsCache');
let flatCacheMiddleware = (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url;
  let cacheContent = cache.getKey(key);
  if (cacheContent) {
    res.send(JSON.parse(cacheContent));
  } else {
    res.sendResponse = res.send;
    res.send = body => {
      cache.setKey(key, body);
      cache.save(true);
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = flatCacheMiddleware;
