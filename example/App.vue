<template>
  <div id="app">
    <v-offline @detected-condition="amIOnline">
      <template #online> ( Online: {{ onLine }} ) </template>
      <template #offline> ( Online: {{ onLine }} ) </template>
    </v-offline>
  </div>
</template>

<script>
  import VOffline from '../src';

  export default {
    components: {
      VOffline,
    },
    data() {
      return {
        online: null,
        onlineSlot: 'online',
        offlineSlot: 'offline',
      };
    },
    methods: {
      /**
       * Listened value emitted from the
       * `detected-condition` event.
       *
       * @param {boolean} e - Boolean value
       * @returns {void} - Void
       */
      amIOnline(e) {
        this.online = e;
      },
    },
  };
</script>
