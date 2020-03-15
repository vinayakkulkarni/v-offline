<template>
  <div id="app">
    <v-offline @detected-condition="amIOnline">
      <template v-slot:[onlineSlot] :slot-name="onlineSlot">
        ( Online: {{ onLine }} )
      </template>
      <template v-slot:[offlineSlot] :slot-name="offlineSlot">
        ( Online: {{ onLine }} )
      </template>
    </v-offline>
  </div>
</template>

<script>
  import VOffline from '../src';

  export default {
    components: {
      VOffline,
    },
    data: () => ({
      onLine: null,
      onlineSlot: 'online',
      offlineSlot: 'offline',
    }),
    methods: {
      amIOnline(e) {
        this.onLine = e;
      },
    },
  };
</script>
