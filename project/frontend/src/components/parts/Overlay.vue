<template>
	<div id="overlay">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: 'Overlay',
	setup() {
		// storeを取得する
		const store = useStore();
		// dialog
		const dialog = computed(() => store.state.dialog.isShow);
		// loading
		const loading = computed(() => store.state.loading.isShow);
		// sidebar
		const sidebar = computed(() => store.state.sidebar.isShow);
		// backImageModal
		const backImageModal = computed(() => store.state.backImageModal.isShow);

		/**
		 * 上記の状態に変更があった場合、以下の処理を行う
		 * (オーバーレイ表示中にスクロールを禁止・解除)
		 */
		watchEffect(() => {
			if (
				dialog.value ||
				loading.value ||
				sidebar.value ||
				backImageModal.value
			) {
				// スクロールイベントを抑制する
				document.addEventListener('mousewheel', disabledScroll, {
					passive: false,
				});
				document.addEventListener('touchmove', disabledScroll, {
					passive: false,
				});
			} else {
				// スクロールイベントの抑制を解除する
				document.removeEventListener('mousewheel', disabledScroll);
				document.removeEventListener('touchmove', disabledScroll);
			}
		});

		// スクロールイベントを抑制する
		const disabledScroll = (event: any) => {
			event.preventDefault();
		};

		return {};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	オーバーレイ
----------------------*/
#overlay {
	width: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 9999;
	height: 200vh;
	overflow: hidden;
	overflow-y: auto;
	position: fixed;
}
</style>
