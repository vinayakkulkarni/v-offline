import { App as Application } from 'vue';
import VOffline from './components/VOffline.vue';

let installed = false;

const install = (app: Application) => {
  if (!installed) {
    app.component('VOffline', VOffline);
    installed = true;
  }
};

export default install;
