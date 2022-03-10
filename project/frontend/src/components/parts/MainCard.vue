<template>
	<div class="main-card" :style="styles">
		<!-- slotタグ = MainCardコンポーネントの間に入る別子コンポーネント -->
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'MainCard',
	props: {
		// カードの幅(デフォルト値：80%)
		width: {
			type: String,
			default: '80%',
		},
		// カードの高さ（デフォルト値： 60vh)
		height: {
			type: String,
			default: '60vh',
		},
		// カード内部の背景色
		color: {
			type: String,
			default: '#eee',
		},
	},
	setup(props) {
		const styles = computed(() => {
			return {
				'--width': `${props.width}`,
				'--height': `${props.height}`,
				'--background-color': `${props.color}`,
			};
		});
		return {
			props,
			styles,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.main-card {
	width: var(--width);
	background-color: var(--background-color);
	height: var(--height);
	border: 1px solid #333;
	box-shadow: 4px 4px gray;
	overflow-y: auto;
}
</style>
