import VueCompositionApi from '@vue/composition-api';
import { VueConstructor } from 'vue';
import VOffline from './VOffline.vue';

let installed = false;

const install = {
  install(Vue: VueConstructor): void {
    if (installed) return;
    Vue.use(VueCompositionApi);
    Vue.component('VOffline', VOffline);
    installed = true;
  },
};

export default install;
