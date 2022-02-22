<template>
	<div>
		<h2>UserPage</h2>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'UserPage',
	components: {},
	setup() {
		return {};
	},
	// MyPageへの遷移前にユーザー情報のvalidation
	beforeRouteEnter(to, from, next) {
		// ルーティングのuidを取得
		const params = to.params;
		const uid = params.uid;
		console.log(uid);
		// 試験的にログインuidと一致しなければHomePageへリダイレクトさせるようにする
		if (uid === '76b535fb855ad64430e794afaa4c3272') {
			next();
		} else {
			next('/');
		}
		console.log(to, from, next);
	},
}); // export default defineComponent
</script>

<style scoped></style>
