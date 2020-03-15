<template>
  <div :class="computedClass">
    <slot :name="slotName" />
  </div>
</template>

<script>
  import Ping from 'ping.js';
  const EVENTS = ['online', 'offline', 'load'];

  export default {
    name: 'VOffline',
    props: {
      slotName: {
        type: String,
        required: false,
        default: 'online',
      },
      onlineClass: {
        type: String,
        required: false,
        default: '',
      },
      offlineClass: {
        type: String,
        required: false,
        default: '',
      },
      pingUrl: {
        type: String,
        required: false,
        default: 'https://google.com',
      },
    },
    data: () => ({
      isOnline: navigator.onLine || false,
    }),
    computed: {
      computedClass() {
        return this.isOnline ? this.onlineClass : this.offlineClass;
      },
    },
    created() {
      EVENTS.forEach((event) =>
        window.addEventListener(event, this.updateOnlineStatus),
      );
    },
    beforeDestroy() {
      EVENTS.forEach((event) =>
        window.removeEventListener(event, this.updateOnlineStatus),
      );
    },
    methods: {
      updateOnlineStatus() {
        const p = new Ping();
        p.ping(this.pingUrl, (err) => {
          if (err) {
            if ('onLine' in navigator && navigator.onLine) {
              this.isOnline = true;
            } else {
              this.isOnline = false;
            }
          }
          this.isOnline = true;
        });
        this.$emit('detected-condition', this.isOnline);
      },
    },
  };
</script>
