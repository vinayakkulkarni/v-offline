import { VueConstructor } from 'vue';
import VOffline from './VOffline.vue';

let installed = false;

const install = {
  install(Vue: VueConstructor): void {
    if (installed) return;
    Vue.component('VOffline', VOffline);
    installed = true;
  },
};

export default install;
