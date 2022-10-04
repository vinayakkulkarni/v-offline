<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script lang="ts">
  import Ping from 'ping.js';
  import { computed, defineComponent, onBeforeUnmount, ref } from 'vue';
  import type { ComputedRef, PropType, Ref, SetupContext } from 'vue';

  type VOfflineProps = {
    onlineClass?: string;
    offlineClass?: string;
    pingUrl?: string;
  };

  export default defineComponent({
    name: 'VOffline',
    props: {
      onlineClass: {
        type: String as PropType<string>,
        required: false,
        default: '',
      },
      offlineClass: {
        type: String as PropType<string>,
        required: false,
        default: '',
      },
      pingUrl: {
        type: String as PropType<string>,
        required: false,
        default: 'https://google.com',
      },
    },
    setup(props: VOfflineProps, { emit }: SetupContext) {
      // Local state
      const isOnline: Ref<boolean> = ref(navigator.onLine || false);
      const events: Ref<string[]> = ref(['online', 'offline', 'load']);
      const url: Ref<string> = ref(props.pingUrl || 'https://google.com');

      // Local computed
      const wrapperClass: ComputedRef<string> = computed(() => {
        if (isOnline.value) {
          return typeof props.onlineClass === 'string' ? props.onlineClass : '';
        } else {
          return typeof props.offlineClass === 'string'
            ? props.offlineClass
            : '';
        }
      });

      /**
       * Created lifecycle hook
       */
      events.value.forEach((event: string) =>
        window.addEventListener(event, check),
      );

      /**
       * Before unmount lifecycle hook
       */
      onBeforeUnmount(() => {
        // Cleanup of the event listeners
        events.value.forEach((event: string) =>
          window.removeEventListener(event, check),
        );
      });

      // Local functions
      /**
       * Pings the URL and emits an
       * detected online/offline event.
       *
       * @returns {Promise<void>}
       */
      async function check(): Promise<void> {
        const p = new Ping();
        try {
          const ping = await p.ping(url.value);
          if (ping || navigator.onLine) {
            isOnline.value = true;
            emit('detected-condition', isOnline.value);
          }
        } catch (error) {
          if (error || !navigator.onLine) {
            isOnline.value = false;
            emit('detected-condition', isOnline.value);
          }
        }
      }

      return {
        wrapperClass,
      };
    },
  });
</script>
