module.exports = {
    name: 'v-offline',

    template: '<div>\
        <div v-bind:class="onlineClass" v-if="state.online"><slot name="online"></slot></div>\
        <div v-bind:class="offlineClass" v-if="!state.online"><slot name="offline"></slot></div>\
    </div>',

    props: {
        onlineClass: {
            type: String,
            default: 'v-online',
            required: false
        },
        offlineClass: {
            type: String,
            default: 'v-offline',
            required: false
        }
    },

    data: function() {
        return {
            state: {
                online: navigator.onLine,
            },
        };
    },

    mounted: function() {
        const vm = this;
        window.addEventListener('load', function() {
            vm.updateOnlineStatus();
            window.addEventListener('online', vm.updateOnlineStatus);
            window.addEventListener('offline', vm.updateOnlineStatus);
        });
    },

    beforeDestroy: function() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);
    },

    methods: {
        updateOnlineStatus: function() {
            const vm = this;
            vm.state.online = navigator.onLine;
            vm.$emit('detected-condition', vm.state.online);
        }
    }
};
