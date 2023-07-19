const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:4000',
      target: 'workout-pal-mern-backend.vercel.app',
      changeOrigin: true,
    })
  );
};