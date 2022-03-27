import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { store, key } from '@/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

library.add(fas);

const app = createApp(App);
app.use(router); // ルーティング関連
app.use(VueAxios, axios); // API関連
app.use(store, key); // 状態管理関連
app.component('fa-icon', FontAwesomeIcon); // FontAwesomeアイコン関連
app.component('vue-cropper', VueCropper); // 画像切り抜き
app.mount('#app');
