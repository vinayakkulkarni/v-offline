import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'VOffline',
      file: 'dist/v-offline.esm.js',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      commonjs(),
      resolve(),
      vue(),
    ],
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
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      commonjs(),
      resolve(),
      vue(),
    ],
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
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
      vue(),
    ],
    external: ['ping'],
  },
];
