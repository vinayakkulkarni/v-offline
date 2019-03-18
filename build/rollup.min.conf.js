import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  plugins: [
    commonjs(),
    vue(),
    uglify(),
    babel(),
  ],
  output: {
    format: 'umd',
    name: 'VOffline',
    file: 'dist/v-offline.min.js',
  },
}
