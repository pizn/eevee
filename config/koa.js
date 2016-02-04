'use strict';

const path = require("path");
const serve = require("koa-static-cache");
const session = require("koa-generic-session");
const logger = require("koa-logger");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const views = require("co-views");
const responseTime = require("koa-response-time");

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 };

module.exports = function(app, config) {

  if (config.app.env !== "test") {
    app.use(logger());
  }

  app.use(errorHandler());

  if (config.app.env === "production") {
    app.use(serve(path.join(config.app.root, "public"), SERVE_OPTIONS, STATIC_FILES_MAP));
  } else {
    app.use(require("koa-proxy")({
      host: "http://localhost:2992",
      match: /^\/_assets\//,
    }));
  }

  app.use(bodyParser());

  app.use(function *(next) {
    this.render = views(config.app.root + "/app/views", {
      map: { html: "swig" },
      cache: config.app.env === "development" ? "memory" : false,
    });
    yield next;
  });

  app.use(compress());
  app.use(responseTime());
}