<template>
  <div id="app">
    <detect-network>
      <h2 slot="online">Try turning on offline in devtools or disable network in system network settings.</h2>
      <h2 slot="offline">
        You don't have internet! Lulz.
      </h2>
    </detect-network>
  </div>
</template>

<script>
import detectNetwork from '../src/v-offline';

export default {
  components: {
    detectNetwork
  }
}
</script>