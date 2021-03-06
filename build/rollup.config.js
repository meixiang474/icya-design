import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { name } from "../package.json";
const file = (type) => `dist/${name}.${type}.js`;
const overrides = {
  compilerOptions: { target: "ES2015", declaration: true },
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
  plugins: [nodeResolve(), typescript({ tsconfigOverride: overrides }), vue()],
  external: ["vue", "mitt", "lodash-es", "axios", "uuid"],
};
