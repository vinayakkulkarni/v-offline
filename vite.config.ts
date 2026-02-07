import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'v-offline',
    },
    rollupOptions: {
      external: ['vue', 'ping.js'],
      output: {
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'v-offline.css';
          return assetInfo.name;
        },
      },
    },
  },
});
