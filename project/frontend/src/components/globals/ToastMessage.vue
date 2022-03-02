<template>
	<div v-show="toast.isShow" class="toast-container" :style="styles">
		<div class="toast-message">
			{{ toast.message }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: 'ToastMessage',
	components: {},
	setup() {
		// storeを取得する
		const store = useStore();
		const toast = computed(() => store.state.toast);
		const styles = computed(() => {
			return {
				'--toast-background-color':
					store.state.toast.toastType === 'success'
						? '#00fa9a'
						: store.state.toast.toastType === 'warning'
						? '#ffd700'
						: store.state.toast.toastType === 'danger'
						? '#ff4500'
						: '',
				'--toast-message-color':
					store.state.toast.toastType === 'success'
						? '#eee'
						: store.state.toast.toastType === 'warning'
						? '#555'
						: store.state.toast.toastType === 'danger'
						? '#eee'
						: '',
				'--toast-border-color':
					store.state.toast.toastType === 'success'
						? '#008080'
						: store.state.toast.toastType === 'warning'
						? '#b8860b'
						: store.state.toast.toastType === 'danger'
						? '#b22222'
						: '#000',
			};
		});
		return {
			toast,
			styles,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.toast-container {
	width: 80%;
	height: 120px;
	background-color: var(
		--toast-background-color
	); /** toastTypeの値によって変化させる */
	position: absolute; /* 浮いているように見える */
	z-index: 9999;
	border-radius: 100px;
	left: 0;
	right: 0;
	margin: 30px auto;
	border: 4px solid var(--toast-border-color);
}
.toast-message {
	color: var(--toast-message-color); /** toastTypeの値によって変化させる */
	font-weight: bold;
	text-align: center;
	line-height: 120px;
	font-size: 25px;
}
</style>
