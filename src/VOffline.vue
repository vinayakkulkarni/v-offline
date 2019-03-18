<template>
  <div :class="computedClass">
    <slot :name="slotName" />
  </div>
</template>

<script>
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
    EVENTS.forEach(event => window.addEventListener(event, this.updateOnlineStatus));
  },
  beforeDestroy() {
    EVENTS.forEach(event => window.removeEventListener(event, this.updateOnlineStatus));
  },
  methods: {
    updateOnlineStatus() {
      this.isOnline = navigator.onLine || false;
      this.$emit('detected-condition', this.isOnline);
    },
  },
};
</script>
