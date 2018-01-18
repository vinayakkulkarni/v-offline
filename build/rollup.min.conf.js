import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  plugins: [
    vue(),
    babel(),
    uglify(),
  ],
  output: {
    format: 'umd',
    name: 'VOffline',
    file: 'dist/v-offline.min.js',
  },
}
