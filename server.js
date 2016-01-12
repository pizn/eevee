"use strict";
const koa = require("koa");
const http = require('http');

/**
 * Config
 */
const config = require("./config/config");

/**
 * Server
 */
const app = module.exports = koa();

// Routes
require("./config/koa")(app, config);
require("./config/routes")(app);

// Start app
if (!module.parent) {
  app.listen(config.app.port);
  console.log("Server started, listening on port: " + config.app.port);
}
console.log("Environment: " + config.app.env);
