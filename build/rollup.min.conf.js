import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  plugins: [commonjs(), resolve(), babel(), vue(), terser()],
  output: {
    format: 'umd',
    name: 'VOffline',
    file: 'dist/v-offline.min.js',
  },
  external: ['ping'],
};
