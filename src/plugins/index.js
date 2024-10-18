/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "./vuetify";
import pinia from "@/stores";
import router from "@/router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {

}

export function registerPlugins(app) {
  app.use(vuetify).use(router).use(pinia).use(Toast, options);
}
