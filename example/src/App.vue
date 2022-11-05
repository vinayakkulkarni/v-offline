<template>
  <v-github-icon url="https://github.com/vinayakkulkarni/v-image" />
  <v-offline
    online-class="online"
    offline-class="offline"
    @detected-condition="onConnectionChange"
  >
    <template v-if="online">
      <div class="flex w-full h-full justify-center items-center text-6xl">
        ⚡️
      </div>
    </template>
    <template v-if="!online">
      <div class="flex w-full h-full justify-center items-center text-6xl">
        💩
      </div>
    </template>
  </v-offline>
  <!-- Netlify Badge -->
  <div class="absolute bottom-4 right-4">
    <a
      href="https://app.netlify.com/sites/v-image/deploys"
      aria-label="View deploys on Netlify"
      target="_blank"
      rel="noopener noreferrer"
      class="gray-400"
    >
      <img
        src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
        alt="Deploys by Netlify"
      />
    </a>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import type { Ref } from 'vue';
  import { VGithubIcon } from 'v-github-icon';
  import { VOffline } from 'v-offline';

  export default defineComponent({
    components: {
      VOffline,
      VGithubIcon,
    },
    setup() {
      const online: Ref<boolean> = ref(false);
      const onConnectionChange = (isOnline: boolean) => {
        online.value = isOnline;
      };
      return {
        online,
        onConnectionChange,
      };
    },
  });
</script>
<style>
  @import url('v-github-icon/dist/v-github-icon.css');
</style>
