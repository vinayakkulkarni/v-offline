const Vue = require('vue');
const VDetectOffline = require('v-offline');

function getComponent(Component, propsData) {
    const Ctor = Vue.extend(Component);
    return new Ctor({ propsData }).$mount();
}

var exampleData = {
    state: {
        online: navigator.onLine,
    },
};

describe('VueDetectOffline', function() {
    it('emits correct event', function(done) {
        const vm = getComponent(VDetectOffline, {
            data: exampleData
        });

        vm.$on('detected-condition', function(status) {
            expect(exampleData.state.online).toBe(true);
            done();
        });
    });

    it('has correct DOM structure', function() {
        const vm = getComponent(VDetectOffline, {
            data: exampleData
        });

        expect(vm.$el.nodeName).toBe('DIV');
    });
});
