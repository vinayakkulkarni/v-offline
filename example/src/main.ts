import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { initGoogleAnalytics } from './analytics';

initGoogleAnalytics();
createApp(App).mount('#app');
