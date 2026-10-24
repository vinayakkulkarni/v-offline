<template>
  <div
    class="inline-flex rounded-md border border-line bg-surface p-0.5"
    role="radiogroup"
    aria-label="Colour theme"
  >
    <button
      v-for="option in options"
      :key="option"
      type="button"
      role="radio"
      :aria-checked="preference === option"
      class="rounded px-2.5 py-1 font-mono text-xs capitalize transition-colors"
      :class="
        preference === option
          ? 'bg-ink text-canvas'
          : 'text-muted hover:text-ink'
      "
      @click="choose(option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup lang="ts">
  import { track } from '../analytics';
  import { useTheme } from '../composables/use-theme';
  import type { ThemePreference } from '../composables/use-theme';

  const options: ThemePreference[] = ['light', 'dark', 'system'];
  const { preference, setPreference } = useTheme();

  function choose(option: ThemePreference): void {
    setPreference(option);
    track('Theme Change', { theme: option });
  }
</script>
