<template>
	<div id="overlay">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Overlay',
	setup() {
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
