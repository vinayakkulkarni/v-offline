<template>
  <section class="rounded-md border border-line bg-sunken">
    <h2
      class="border-b border-line px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted"
    >
      Usage
    </h2>
    <pre
      class="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed"
    ><code>{{ code }}</code></pre>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{ pingUrl: string }>();

  const code = computed(
    () => `<script setup lang="ts">
  import { VOffline } from 'v-offline';

  function onChange(online: boolean) {
    console.log(online ? 'online' : 'offline');
  }
</${'script'}>

<template>
  <VOffline
    online-class="is-online"
    offline-class="is-offline"
    ping-url="${props.pingUrl}"
    @detected-condition="onChange"
  >
    <YourApp />
  </VOffline>
</template>`,
  );
</script>
