<template>
	<div v-show="sidebar.isShow" class="sidebar-wrapper flex">
		<div class="sidebar-container">
			<div class="menu-title">
				<h2>Menu</h2>
			</div>
			<div v-for="item in items" :key="item.id" class="menu-list">
				<span @click="onclickMenuItem($event, item)">
					{{ item.name }}
				</span>
			</div>
		</div>
		<div class="overlay" @click="onclickOverLay"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

export default defineComponent({
	name: 'SideBar',
	components: {},
	setup() {
		const store = useStore();
		// VueRouter
		const router = useRouter();
		const sidebar = computed(() => store.state.sidebar);
		let items = [];
		if (computed(() => store.state.user.isLogined)) {
			items = [
				{ id: 1, name: 'チャット', path: '/rooms' },
				{ id: 2, name: 'ゲーム1', path: '/game1' },
				{ id: 3, name: 'ゲーム2', path: '/game2' },
			];
		} else {
			items = [
				{ id: 1, name: '新規登録', path: '/signup' },
				{ id: 2, name: 'ログイン', path: '/login' },
			];
		}
		// メニューのアイテム押下時の処理
		const onclickMenuItem = (
			event: MouseEvent,
			item: { id: number; name: string; path: string }
		) => {
			event.preventDefault();
			router.push(item.path);
			store.dispatch('setSideBar', { active: '', isShow: false });
		};

		// オーバーレイ押下時の処理
		const onclickOverLay = () => {
			store.dispatch('setSideBar', { active: '', isShow: false });
		};

		return {
			items,
			onclickMenuItem,
			sidebar,
			onclickOverLay,
		};
	},
});
</script>

<style scoped>
:root {
	--menu-item-height: 120px;
}

.sidebar-wrapper {
	height: 100vh;
	width: 100%;
	position: absolute;
}

.flex {
	display: flex;
}

.overlay {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 9999;
}

.sidebar-container {
	border: 1px solid;
	width: 300px;
	height: 100%;
	z-index: 2;
	background: teal;
	color: #f5f5f5;
	font-family: 'Comic Sans MS', sans-serif;
}

.menu-title {
	height: var(--menu-item-height);
	margin-left: 10px;
}

.menu-list {
	height: var(--menu-item-height);
	font-weight: bold;
	font-size: 24px;
	font-family: 'Comic Sans MS', sans-serif;
	margin-left: 20px;
	margin-top: 20px;
}
.menu-list span:hover {
	cursor: pointer;
}
</style>
