<template>
  <div id="app">
    <main class="w-screen h-screen">
      <v-offline
        online-class="online"
        offline-class="offline"
        @detected-condition="amIOnline"
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
    </main>
  </div>
</template>

<script>
  import { VOffline } from '../src';

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
      amIOnline(e) {
        console.log('am i online?: ', e);
        this.online = e;
      },
    },
  };
</script>
<style>
  * {
    margin: 0;
  }

  .w-screen {
    width: 100vw;
  }

  .h-screen {
    height: 100vh;
  }

  .flex {
    display: flex;
  }

  .w-full {
    width: 100%;
  }

  .h-full {
    height: 100%;
  }

  .justify-center {
    justify-content: center;
  }

  .items-center {
    align-items: center;
  }

  .text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }

  .offline {
    width: 100%;
    height: 100%;
    background-color: #fc9842;
    background-image: linear-gradient(315deg, #fc9842 0%, #fe5f75 74%);
  }

  .online {
    width: 100%;
    height: 100%;
    background-color: #00b712;
    background-image: linear-gradient(315deg, #00b712 0%, #9bca15 74%);
  }
</style>
