<template>
  <div
    class="flex max-w-full items-center gap-3 rounded-md border border-line bg-surface py-1.5 pl-4 pr-1.5 font-mono text-sm"
  >
    <span class="text-muted" aria-hidden="true">$</span>
    <code class="min-w-0 flex-1 truncate">{{ command }}</code>
    <button
      type="button"
      class="shrink-0 rounded bg-ink px-3 py-1.5 text-xs text-canvas transition-opacity hover:opacity-85"
      @click="copy"
    >
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { track } from '../analytics';

  const command = 'pnpm add v-offline ping.js';
  const copied = ref(false);

  async function copy(): Promise<void> {
    await navigator.clipboard.writeText(command);
    copied.value = true;
    track('Install Copy', { command });
    setTimeout(() => {
      copied.value = false;
    }, 1600);
  }
</script>
