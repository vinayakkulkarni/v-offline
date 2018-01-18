<template>
  <div>
    <div :class="onlineClass" v-if="onLine"><slot name="online"/></div>
    <div :class="offlineClass" v-else><slot name="offline"/></div>
  </div>
</template>

<script>
export default {
  name: 'v-offline',
  props: {
    onlineClass: {
      type: String,
      required: false
    },
    offlineClass: {
      type: String,
      required: false
    }
  },
  data: () => ({
    onLine: navigator.onLine || false,
  }),
  mounted() {
    window.addEventListener('load', () => {
      this.updateOnlineStatus();
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    });
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  },
  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine || false;
      this.$emit('detected-condition', this.isOnline);
    }
  }
};
</script>
