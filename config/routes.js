'use strict';

const Router = require("koa-router");

const indexController = require("../app/controllers/index");

module.exports = function(app) {
  const router = new Router();

  router.use(function *(next) {
    this.type = "json";
    yield next;
  });

  router.get("/", function *() {
    this.type = "html";
    yield indexController.index.apply(this);
  });

  app.use(router.routes());
};
