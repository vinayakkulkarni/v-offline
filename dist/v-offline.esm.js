var EVENTS = ['online', 'offline', 'load'];

var VOffline = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: { onlineClass: _vm.isOnline, offlineClass: !_vm.isOnline } }, [_vm.isOnline ? _vm._t("online") : _vm._t("offline")], 2);
  }, staticRenderFns: [],
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
  data: function data() {
    return {
      isOnline: navigator.onLine || false
    };
  },
  mounted: function mounted() {
    var _this = this;

    EVENTS.forEach(function (event) {
      return window.addEventListener(event, _this.updateOnlineStatus);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this2 = this;

    EVENTS.forEach(function (event) {
      return window.removeEventListener(event, _this2.updateOnlineStatus);
    });
  },

  methods: {
    updateOnlineStatus: function updateOnlineStatus() {
      this.isOnline = navigator.onLine || false;
      this.$emit('detected-condition', this.isOnline);
    }
  }
};

export default VOffline;
