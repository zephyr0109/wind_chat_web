const {
  override,
  disableEsLint,
  overrideDevServer,
  watchAll,
} = require("customize-cra");
const { alias } = require("react-app-rewire-alias");
module.exports = {
  webpack: override(
    // usual webpack plugin
    disableEsLint(),
    alias({
      "~src": "./src",
      "~config": "./src/config",
      "~container": "./src/container",
      "~components": "./src/components",
      "~domain": "./src/domain",
      "~hook": "./src/hook",
      "~service": "./src/service",
      "~resources": "./src/resources",
    })
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  ),
};
