'use strict';

const path = require("path");
const _ = require("lodash");

const env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

const base = {
  app: {
    root: path.normalize(path.join(__dirname, "/..")),
    env: env,
  },
};

const specific = {
  development: {
    app: {
      port: 3000,
      name: "Lark chat - Dev",
      keys: [ "super-secret-hurr-durr" ],
    },
  },
  test: {
    app: {
      port: 3000,
      name: "Lark chat - Test",
      keys: [ "super-secret-hurr-durr" ],
    },
  },
  production: {
    app: {
      port: process.env.PORT || 3000,
      name: "Lark chat - Test",
    },
  }
};

module.exports = _.merge(base, specific[env]);