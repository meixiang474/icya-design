import vue from "rollup-plugin-vue";
import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { name } from "../package.json";
const file = (type) => `dist/${name}.${type}.js`;
const overrides = {
  compilerOptions: { declaration: true },
  exclude: [
    "tests/**/*.ts",
    "tests/**/*.tsx",
    "src/main.ts",
    "src/**/*.stories.ts",
  ],
};
export { name, file };
export default {
  input: "./src/components/index.ts",
  output: {
    name,
    file: file("esm"),
    format: "es",
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      babelHelpers: "runtime",
      exclude: "**/node_modules/**",
      presets: ["@vue/cli-plugin-babel/preset"],
    }),
    vue(),
  ],
  external: ["vue", "mitt", "lodash-es", "axios", "uuid"],
};
