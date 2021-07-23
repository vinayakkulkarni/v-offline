import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import beep from '@rollup/plugin-beep';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import pkg from '../package.json';

const extensions = ['.js', '.ts', '.vue'];

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) 2021 ${pkg.author.name}<${pkg.author.email}>
 * Released under the ${pkg.license} License
 */
`;

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/v-offline.min.js',
    format: 'umd',
    name: 'Widget',
    exports: 'named',
    strict: true,
    sourcemap: true,
    banner,
    globals: {
      vue: 'vue',
      'ping.js': 'ping',
      '@vue/composition-api': 'vueCompositionApi',
    },
  },
  plugins: [
    alias({
      entries: {
        vue: 'vue/dist/vue.runtime.esm.js',
      },
    }),
    resolve({ extensions, browser: true }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs({ extensions, exclude: 'src/**' }),
    vue({ css: false }),
    scss({
      output: 'dist/v-offline.min.css',
      outputStyle: 'compressed',
    }),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript'],
    }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    }),
    beep(),
  ],
  external: ['vue', 'ping.js', '@vue/composition-api'],
};
