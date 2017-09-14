const Vue = require('vue');
const VDetectOffline = require('../src/v-offline.js');

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
});