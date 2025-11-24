 
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "http://crmapi2025.runasp.net",
      secure: false,
      changeOrigin: true,
    })
  );
};
