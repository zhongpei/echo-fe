const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/echo-api',
    createProxyMiddleware({
      target: 'http://echonew.virjar.com/',
      changeOrigin: true,
      pathRewrite: {
        "^/echo-api": "/echo-api"
      }
    })
  );
};