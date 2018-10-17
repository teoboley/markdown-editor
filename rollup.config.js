import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import json from 'rollup-plugin-json';

export default {
  input: "src/index.tsx",
  output: {
    file: "build/index.js",
    format: "cjs"
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    typescript(),
    commonjs({
      namedExports: {
        'node_modules/immutable/dist/immutable.js': [ 'Set', 'Record', 'Map', 'List', 'OrderedSet', 'Stack', 'is' ],
        'node_modules/esrever/esrever.js': [ 'reverse' ]
      }
    }),
    json()
  ],
  external: id => /^react/.test(id)
};