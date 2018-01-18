import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/index.js',
  plugins: [
    vue(),
    babel(),
  ],
  output: [
    {
      format: 'umd',
      name: 'VOffline',
      file: 'dist/v-offline.js',
    },
    {
      format: 'es',
      file: 'dist/v-offline.esm.js',
    },
  ],
}
