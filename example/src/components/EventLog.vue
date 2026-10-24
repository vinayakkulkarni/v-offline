<template>
  <section class="rounded-md border border-line bg-surface">
    <header
      class="flex items-center justify-between border-b border-line px-4 py-3"
    >
      <h2 class="font-mono text-xs uppercase tracking-wider text-muted">
        @detected-condition
      </h2>
      <span class="font-mono text-xs text-muted">{{ entries.length }}</span>
    </header>
    <ol
      v-if="entries.length"
      class="max-h-64 divide-y divide-line overflow-y-auto"
    >
      <li
        v-for="entry in entries"
        :key="entry.id"
        class="grid grid-cols-[auto_1fr] gap-x-3 px-4 py-2.5 font-mono text-xs sm:grid-cols-[auto_auto_1fr]"
      >
        <time class="text-muted">{{ entry.time }}</time>
        <span :class="entry.online ? 'text-online' : 'text-signal'">
          {{ entry.online ? 'true' : 'false' }}
        </span>
        <span class="col-span-2 truncate text-muted sm:col-span-1">
          {{ entry.url }}
        </span>
      </li>
    </ol>
    <p v-else class="px-4 py-6 text-sm text-muted">
      No events yet. Run a check, or switch your network off.
    </p>
  </section>
</template>

<script setup lang="ts">
  export interface LogEntry {
    id: number;
    time: string;
    online: boolean;
    url: string;
  }

  defineProps<{ entries: LogEntry[] }>();
</script>
