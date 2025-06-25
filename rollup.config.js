// rollup.config.js

export default {
  input: "src/beedom.js",
  output: [
    {
      file: "dist/beedom.js",
      format: "esm", // ES module
      sourcemap: true,
    },
    {
      file: "dist/beedom.umd.js",
      format: "umd",
      name: "Beedom", // window.Beedom available in browsers
      sourcemap: true,
    },
  ],
};
