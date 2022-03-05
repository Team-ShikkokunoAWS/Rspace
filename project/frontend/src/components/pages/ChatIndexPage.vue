<template>
	<MainCard
		width="800px"
		height="120px"
		class="chat-room-card"
		v-for="item in items"
		:key="item.uid"
		@click="onclickChatRoom(item.roomId)"
	>
		<div class="chatIndex-user-wrapper">
			<div class="user-icon">
				<img
					class="user-icon-img"
					:src="require(`@/assets/${item.iconImage}`)"
				/>
				<div class="user-name">
					{{ item.username }}
				</div>
			</div>
		</div>
		<div class="message-wrapper">
			<div class="message-bar">
				{{ item.message }}
			</div>
			<div class="message-time">{{ item.timestamp }}</div>
		</div>
	</MainCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainCard from '@/components/parts/MainCard.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'ChatIndexPage',
	components: {
		MainCard,
	},
	setup() {
		// 描写用モックデータ
		const items = [
			{
				roomId: '1',
				uid: 'test-test-test-test-1',
				username: 'John',
				message: 'hello good night!!',
				timestamp: '2022-03-03 21:54',
			},
			{
				roomId: '2',
				uid: 'test-test-test-test-2',
				username: 'Mary',
				message: 'lets talk with me??',
				timestamp: '2022-03-02 20:32',
			},
			{
				roomId: '3',
				uid: 'test-test-test-test-3',
				username: 'あいうえおあいうえおあいうえおあいうえおあいうえお',
				message:
					'lorem ipsum dolor sit am lorem ipsum dolor sit am lorem ipsum dolor sit',
				timestamp: '2022-03-01 18:44',
			},
		];

		// VueRouter
		const router = useRouter();

		// 各チャットルーム押下時の処理
		const onclickChatRoom = (roomId: string) => {
			router.push(`/rooms/${roomId}`);
		};

		return {
			items,
			onclickChatRoom,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.chat-room-card {
	padding: 12px;
	display: flex;
	position: relative;
	box-shadow: none;
	border-radius: 12px;
}
.chat-room-card:hover {
	opacity: 0.8;
	cursor: pointer;
}

.user-icon {
	width: 180px;
	height: 120px;
}
.user-icon-img {
	display: block;
	margin: 0 auto;
	width: 80px;
	height: 80px;
	border-radius: 50%;
}
.user-name {
	text-align: center;
	margin-top: 12px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.message-wrapper {
	padding: 12px;
	border-radius: 8px;
	font-size: 16px;
	background-color: #fff;
	height: 80px;
	position: absolute;
	left: 210px;
	top: 24px;
}
.message-bar {
	width: 560px;
	height: 40px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.message-time {
	position: absolute;
	bottom: 10px;
	right: 12px;
}
</style>
