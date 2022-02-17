import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';
import { VueCookieNext } from 'vue-cookie-next';

// ルーティングパスと表示内容を配列として設定
const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: HomePage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (VueCookieNext.getCookie('loginUser')) {
				next();
			} else {
				next('/login');
			}
		},
	},
	{
		path: '/login',
		name: 'LoginPage',
		component: LoginPage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (VueCookieNext.getCookie('loginUser')) {
				next('/');
			} else {
				next();
			}
		},
	},
	{
		path: '/signup',
		name: 'SignUpPage',
		component: SignUpPage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (VueCookieNext.getCookie('loginUser')) {
				next('/');
			} else {
				next();
			}
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
