<template>
  <header
    class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8"
  >
    <a href="/" class="flex items-center gap-2 font-mono text-sm font-medium">
      <span class="size-2.5 rounded-full bg-signal" aria-hidden="true" />
      v-offline
    </a>
    <nav class="flex items-center gap-4 text-sm">
      <a
        :href="links.github"
        target="_blank"
        rel="noopener noreferrer"
        class="text-muted transition-colors hover:text-ink"
        @click="track('Outbound Link', { target: 'github' })"
      >
        GitHub
      </a>
      <a
        :href="links.npm"
        target="_blank"
        rel="noopener noreferrer"
        class="text-muted transition-colors hover:text-ink"
        @click="track('Outbound Link', { target: 'npm' })"
      >
        npm
      </a>
      <ThemeToggle />
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { track } from '../analytics';
  import ThemeToggle from './ThemeToggle.vue';

  const links = {
    github: 'https://github.com/vinayakkulkarni/v-offline',
    npm: 'https://www.npmjs.com/package/v-offline',
  };
</script>
