import { defineConfig, type Options } from "tsup";
import path from "path";

const env = process.env.NODE_ENV;

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: false, // Disable code splitting for a lighter bundle
  target: "es2020",
  format: ["esm"], // Only generate esm files for React
  entry: [
    "./src/components/ui/**/*.{ts,tsx}",
    "./src/components/date-picker/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  skipNodeModulesBundle: true,
  minify: !options.watch && env === "production",
  bundle: true, // Enable bundling for a single, lighter output
  clean: true,
  dts: true,
  sourcemap: false, // Disable sourcemaps to reduce bundle size
  outDir: "dist",
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  esbuildOptions(options, context) {
    options.outbase = "src";
  },
  external: ["react", "react-dom"], // Externalize React dependencies
  ...options,
}));
