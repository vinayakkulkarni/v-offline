import { App as Application, Plugin } from 'vue';
import VOffline from './components/VOffline.vue';
import { setVueInstance } from './utils/config/index';

let installed: boolean = false;

const install: Exclude<Plugin['install'], undefined> = (
  instance: Application,
) => {
  if (!installed) {
    setVueInstance(instance);
    instance.component('VOffline', VOffline);
    installed = true;
  }
};

export default install;
