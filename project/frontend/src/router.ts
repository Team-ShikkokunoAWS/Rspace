import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import SignUpPage from '@/components/pages/SignUpPage.vue';
import ChatIndexPage from '@/components/pages/ChatIndexPage.vue';
import ChatRoomPage from '@/components/pages/ChatRoomPage.vue';
import Game1Page from '@/components/pages/Game1Page.vue';
import Game2Page from '@/components/pages/Game2Page.vue';
import UserPage from '@/components/pages/UserPage.vue';
import UserEditPage from '@/components/pages/UserEditPage.vue';
import UserIndexPage from '@/components/pages/UserIndexPage.vue';
import NotFoundPage from '@/components/pages/NotFoundPage.vue';
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
	// ユーザー一覧ページ
	{
		path: '/users',
		name: 'UserIndexPage',
		component: UserIndexPage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
				next();
			} else {
				next('/');
			}
		},
	},
	// 各ユーザーマイページ
	{
		path: '/users/:uid',
		name: 'UserPage',
		component: UserPage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
				next();
			} else {
				next('/');
			}
		},
	},
	// ユーザー情報編集ページ
	{
		path: '/users/:uid/edit',
		name: 'UserEditPage',
		component: UserEditPage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
				next();
			} else {
				next('/');
			}
		},
	},
	// チャット一覧ページ
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
	// チャットページ
	{
		path: '/rooms/:room_id',
		name: 'ChatRoomPage',
		component: ChatRoomPage,
		beforeEnter: (_to: any, _from: any, next: any) => {
			if (store.state.user.isLogined) {
				next();
			} else {
				next('/login');
			}
		},
	},
	// Game1ページ
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
	// Game2ページ
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
	// ログインページ
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
	// 新規登録ページ
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
	// 404ページ
	{
		path: '/:catchAll(.*)',
		name: 'NotFoundPage',
		component: NotFoundPage,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
