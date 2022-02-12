import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { store, key } from './store'

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(store, key);
app.mount("#app");