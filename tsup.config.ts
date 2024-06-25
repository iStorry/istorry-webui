import { defineConfig, type Options } from "tsup";

const env = process.env.NODE_ENV;
import path from "path";

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  target: "es2020",
  format: ["cjs", "esm"], // generate cjs and esm files
  entry: [
    "./src/components/ui/!(index).ts?(x)",
    "./src/lib/!(index).ts?(x)",
    // "!./**/*.spec.*",
    // "!./**/*.stories.*",
  ],
  skipNodeModulesBundle: true, // Skips building dependencies for node modules
  minify: !options.watch && env === "production",
  bundle: false, //env === 'production',
  clean: true, // clean up the dist folder
  dts: true, // generate dts file for main module
  sourcemap: true, //env === 'production', // source map is only available in prod
  outDir: "dist", // env === 'production' ? 'dist' : 'lib',
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  esbuildOptions(options, context) {
    options.outbase = "./";
  },
  external: ["react"],
  ...options,
  // banner: {js: '"use client";'},
}));
