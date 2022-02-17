import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { store, key } from '@/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VueCookieNext } from 'vue-cookie-next';

library.add(fas);

// クッキーのグローバル設定
VueCookieNext.config({
	// 期限: y:年, m:月, d:日, h:時間, min:分, s:秒で設定
	expire: '30s', // 期限:30秒（テスト用）
	path: '/',
	domain: '',
	secure: '',
	sameSite: '',
});

const app = createApp(App);
app.use(router); // ルーティング関連
app.use(VueAxios, axios); // API関連
app.use(store, key); // 状態管理関連
app.use(VueCookieNext); // クッキー管理
app.component('fa-icon', FontAwesomeIcon); // FontAwesomeアイコン関連
app.mount('#app');
