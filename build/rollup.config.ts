import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import beep from '@rollup/plugin-beep';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sucrase from '@rollup/plugin-sucrase';
import scss from 'rollup-plugin-scss';
import vue from 'rollup-plugin-vue';
import pkg from '../package.json';

const extensions = ['.js', '.ts', '.vue'];

const plugins = [
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
    output: 'dist/v-offline.css',
  }),
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript'],
  }),
  beep(),
];

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * (c) ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
 * Released under the ${pkg.license} License
 */
`;

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/v-offline.esm.js',
      format: 'esm',
      name: 'VOffline',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    {
      file: 'dist/v-offline.cjs.js',
      format: 'cjs',
      name: 'VOffline',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    {
      file: 'dist/v-offline.js',
      format: 'umd',
      name: 'VOffline',
      exports: 'named',
      sourcemap: true,
      banner,
      globals: {
        vue: 'vue',
        'ping.js': 'ping',
        '@vue/composition-api': 'vueCompositionApi',
      },
    },
  ],
  plugins,
  external: ['vue', 'ping.js', '@vue/composition-api'],
};
