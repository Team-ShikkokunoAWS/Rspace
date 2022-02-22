<template>
	<h1>HomePage</h1>
	<button @click="onClickLink($event)">{{ loginUser.uid }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

export default defineComponent({
	name: 'HomePage',
	components: {},
	setup() {
		const store = useStore();
		const router = useRouter();
		const loginUser = store.state.user;
		const onClickLink = (event: MouseEvent) => {
			event.preventDefault();
			// UserPageへ遷移する（動的なuidでのルーティング）試験的にログインしているユーザー情報で遷移
			router.push({ name: 'UserPage', params: { uid: loginUser.uid } });
			// router.push(`/user/${loginUser.uid}`); こっちでも可能
		};
		return {
			onClickLink,
			loginUser,
		};
	},
}); // export default defineComponent
</script>

<style scoped></style>
