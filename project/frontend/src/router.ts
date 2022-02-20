import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import SignUpPage from '@/components/pages/SignUpPage.vue';
import ChatIndexPage from '@/components/pages/ChatIndexPage.vue';
import Game1Page from '@/components/pages/Game1Page.vue';
import Game2Page from '@/components/pages/Game2Page.vue';
import { store } from '@/store';

// ルーティングパスと表示内容を配列として設定
const routes = [
	{
		path: '/',
		name: 'HomePage',
		component: HomePage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
				next();
			} else {
				next('/login');
			}
		},
	},
	{
		path: '/rooms',
		name: 'ChatIndexPage',
		component: ChatIndexPage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
				next();
			} else {
				next('/login');
			}
		},
	},
	{
		path: '/game1',
		name: 'Game1',
		component: Game1Page,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
				next();
			} else {
				next('/login');
			}
		},
	},
	{
		path: '/game2',
		name: 'Game2',
		component: Game2Page,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
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
			if (store.state.user.isLogined) {
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
			if (store.state.user.isLogined) {
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
