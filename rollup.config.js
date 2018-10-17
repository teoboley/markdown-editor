import typescript from "rollup-plugin-typescript2";
import autoExternal from 'rollup-plugin-auto-external';

export default {
  input: "src/index.tsx",
  output: {
    file: "build/index.js",
    format: "cjs"
  },
  plugins: [
    autoExternal(),
    typescript()
  ]
};