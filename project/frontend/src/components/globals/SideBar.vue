<template>
	<Overlay v-show="sidebar.isShow" class="overlay" @click="onclickOverLay">
		<div class="sidebar-container fadeUp">
			<div class="menu-title">
				<h2>Menu</h2>
			</div>
			<div v-for="item in items" :key="item.id" class="menu-list">
				<span class="border" @click="onclickMenuItem($event, item)">
					{{ item.name }}
				</span>
			</div>
		</div>
	</Overlay>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import Overlay from '@/components/parts/Overlay.vue';

export default defineComponent({
	name: 'SideBar',
	components: {
		Overlay,
	},
	setup() {
		const store = useStore();
		// VueRouter
		const router = useRouter();
		const sidebar = computed(() => store.state.sidebar);
		// TODO: バックエンドから情報を受け取って拡張性を高くする
		const items = [
			{ id: 1, name: 'チャット', path: '/rooms' },
			{ id: 2, name: 'ゲーム1', path: '/game1' },
			{ id: 3, name: 'ゲーム2', path: '/game2' },
		];
		// メニューのアイテム押下時の処理
		const onclickMenuItem = (
			event: MouseEvent,
			item: { id: number; name: string; path: string }
		) => {
			event.preventDefault();
			router.push(item.path);
			store.dispatch('sidebar/setSideBar', { active: '', isShow: false });
		};

		// オーバーレイ押下時の処理
		const onclickOverLay = () => {
			store.dispatch('sidebar/setSideBar', { active: '', isShow: false });
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

.flex {
	display: flex;
}

.sidebar-container {
	border: 1px solid;
	width: 300px;
	height: 100vh;
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

.border:hover {
	border-bottom: 3px solid;
}

.fadeUp {
	animation-name: fadeUpAnime;
	animation-duration: 0.6s;
	animation-fill-mode: forwards;
	opacity: 0;
}

@keyframes fadeUpAnime {
	from {
		opacity: 0;
		transform: translateX(-300px);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
