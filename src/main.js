/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import ApiService from './services/ApiService';

// Components
import App from './App.vue'
const globalOptions = {
    mode: 'auto',
  };
// Composables
import { createApp } from 'vue'

const app = createApp(App)

ApiService.init(import.meta.env.VITE_API_BASE_URL);
app.config.globalProperties.$apiservice = ApiService;
registerPlugins(app)

app.mount('#app')
