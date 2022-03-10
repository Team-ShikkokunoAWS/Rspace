<template>
	<div class="user-index-title">
		<h2>ユーザー</h2>
	</div>

	<MainCard
		class="users-card"
		color="#fff"
		height="120px"
		width="640px"
		v-for="user in users"
		:key="user.uid"
		@click="onclickUserCard(user.uid)"
	>
		<div class="uesr-info">
			<div class="user-icon">
				<UserIcon
					width="80px"
					height="80px"
					:backgroundImage="user.iconImage"
				/>
			</div>
			<div class="user-name">
				{{ user.name }}
			</div>
			<div class="user-message">
				<fa-icon
					class="direct-message-btn"
					icon="square-envelope"
					@click.stop="onclickMessageRoom(user.uid)"
				/>
			</div>
		</div>
	</MainCard>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import MainCard from '@/components/parts/MainCard.vue';
import UserIcon from '@/components/parts/UserIcon.vue';

export default defineComponent({
	name: 'UserIndexPage',
	components: {
		MainCard,
		UserIcon,
	},
	setup() {
		// mockData
		const users = [
			{
				uid: 'test-test-test-1',
				name: 'test1',
				iconImage: 'img.jpg',
			},
			{
				uid: 'test-test-test-2',
				name: 'test2',
				iconImage: 'img.jpg',
			},
			{
				uid: 'test-test-test-3',
				name: 'test3',
				iconImage: 'img.jpg',
			},
			{
				uid: 'test-test-test-4',
				name: 'test4',
				iconImage: 'img.jpg',
			},
			{
				uid: 'test-test-test-5',
				name: 'lorem ipsum dolor sit am lorem ipsum dolor sit',
				iconImage: 'img.jpg',
			},
		];

		// VueRouter
		const router = useRouter();
		// storeを取得する
		const store = useStore();
		const userInfo = computed(() => store.state.user);

		// ユーザーカード押下時の遷移
		const onclickUserCard = (uid: string) => {
			// router.push(`/user/${uid}`);
			console.log(uid);
			router.push(`/user/test-1234-user-5678-abcd-9012-gues-tuse`); // TODO:(fixme)ユーザーページがゲストユーザーしか遷移できない状態なので合わせている
		};

		// DMリンク押下時の処理
		const onclickMessageRoom = (uid: string) => {
			console.log(userInfo, uid);
			// API処理を行う
			// 1. 相手のuidと自分のuidを元にUserRoom中間テーブルを検索
			// 2-1. 検索結果が存在する場合、検索結果. room_idをバックエンドから受け取る
			// 2-2. 検索結果が存在しない場合、新しく相手のuidと自分のuidを元に新規チャットルームを作成し、そのroom_idを受け取る
			// 3. 2-1 or 2-2の処理を行い、バックエンドから送られてきたroom_idを元に遷移する  router.push(`/rooms/${response.data.room_id}`);
			router.push(`/rooms/1`);
		};

		return {
			users,
			onclickUserCard,
			onclickMessageRoom,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	ユーザー一覧タイトル
 ----------------------*/
.user-index-title {
	text-align: center;
}

/*---------------------
	ユーザー一覧カード
 ----------------------*/
.users-card {
	margin: 32px auto;
}
.users-card:hover {
	opacity: 0.6;
	cursor: pointer;
}

/*---------------------
	ユーザーカード内部
 ----------------------*/
.uesr-info {
	position: relative;
}
/* ユーザーアイコン */
.user-icon {
	position: absolute;
	top: 16px;
	left: 16px;
}

/* ユーザー名 */
.user-name {
	position: absolute;
	top: 56px;
	left: 120px;
}

/* DMリンクボタン */
.direct-message-btn {
	position: absolute;
	top: 40px;
	right: 32px;
	font-size: 48px;
	color: #6495ed;
}
.direct-message-btn:hover {
	opacity: 0.6;
	cursor: pointer;
}
</style>
