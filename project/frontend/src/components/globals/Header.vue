<template>
	<div class="header-container">
		<div class="header-title">
			<h1 class="header-title">RSpace</h1>
		</div>
		<div class="header-user-info" v-if="userInfo.name">
			<div>
				<p>{{ userInfo.name }}</p>
			</div>
			<div>
				<fa-icon
					icon="arrow-right-from-bracket"
					class="header-logout-btn"
					@click="onclickLogout($event)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: 'Header',
	components: {},
	setup() {
		// storeを取得する
		const store = useStore();
		const userInfo = computed(() => store.state.user);

		// ログアウトボタン押下時の処理
		const onclickLogout = (event: MouseEvent) => {
			event.preventDefault();
			store.dispatch('setDialog', {
				title: 'ログアウト確認',
				message: 'ログアウトしますか？',
				dialogType: 'logout',
				isShow: true,
			});
		};
		return {
			userInfo,
			onclickLogout,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.header-container {
	width: 100%;
	height: 80px;
	border-bottom: 1.5px solid #333;
	display: flex;
}

.header-title {
	margin-left: 20px;
}

.header-user-info {
	margin-left: auto;
	margin-right: 50px;
	margin-top: 20px;
	display: flex;
}

.header-logout-btn {
	font-size: 25px;
	line-height: 20px;
	margin-top: 8px;
	margin-left: 10px;
	background-color: #ddd;
	padding: 8px;
	border-radius: 12px;
}

.header-logout-btn:hover {
	opacity: 0.8;
	cursor: pointer;
}
</style>