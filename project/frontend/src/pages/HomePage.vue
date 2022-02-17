<template>
	<h1>HomePage</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useCookie } from 'vue-cookie-next';

export default defineComponent({
	name: 'HomePage',
	components: {},
	setup() {
		const cookie = useCookie();
		// 画面初期表示時の処理
		onMounted(() => {
			console.log(cookie.getCookie('loginUser'));
		});

		return {
			onMounted,
		};
	},
}); // export default defineComponent
</script>

<style scoped></style>
