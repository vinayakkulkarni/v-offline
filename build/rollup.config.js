import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';

const plugins = [
  resolve({
    extensions: ['.js', '.vue'],
    browser: true,
  }),
  alias({
    entries: {
      vue: 'vue/dist/vue.esm.browser.min.js',
    },
  }),
  commonjs({ extensions: ['.js', '.vue'], exclude: 'src/**' }),
  babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
  vue({ css: false }),
];

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'VOffline',
      file: 'dist/v-offline.esm.js',
    },
    plugins,
    external: ['ping'],
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      name: 'VOffline',
      file: 'dist/v-offline.cjs.js',
      exports: 'default',
    },
    plugins,
    external: ['ping'],
  },
  // UMD build.
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'VOffline',
      file: 'dist/v-offline.js',
      globals: {
        'ping.js': 'ping',
      },
    },
    plugins,
    external: ['ping'],
  },
];
