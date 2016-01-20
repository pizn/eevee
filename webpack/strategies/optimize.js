import _ from "lodash";
import { optimize, NoErrorsPlugin, HotModuleReplacementPlugin } from "webpack";

export default (config, options) => {
  if (options.optimize) {
    config = _.extend({}, config, {
      output: _.extend({}, config.output, {
        filename: "[name].min.js",
      }),
    });
    config.plugins = config.plugins.concat([
      new HotModuleReplacementPlugin(),
      new optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new optimize.OccurenceOrderPlugin(),
      new optimize.DedupePlugin(),
      new NoErrorsPlugin(),
    ]);
    return config;
  }

  return config;
};
