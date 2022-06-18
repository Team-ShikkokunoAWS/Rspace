<template>
	<div class="chat--index-page-container">
		<MainCard
			width="800px"
			height="120px"
			class="chat-room-card"
			v-for="item in state.items"
			:key="item.room_id"
			@click="onclickChatRoom(item.roomId)"
		>
			<div class="chatIndex-user-wrapper">
				<div class="user-icon">
					<UserIcon
						width="80px"
						height="80px"
						:backgroundImage="item.iconImage"
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
				<div class="message-time">{{ item.updated_at }}</div>
			</div>
		</MainCard>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { MessageManager, Messages } from '@/constants/MessageManager';
import { useStore } from '@/store';
import MainCard from '@/components/parts/MainCard.vue';
import UserIcon from '@/components/parts/UserIcon.vue';
import axios from '@/plugins/axios';

type ChatCard = {
	roomId: string;
	iconImage?: string;
	username: string;
	message: string;
	timestamp: string;
};

interface State {
	items: Array<ChatCard>;
}

export default defineComponent({
	name: 'ChatIndexPage',
	components: {
		MainCard,
		UserIcon,
	},
	setup() {
		// VueRouter
		const router = useRouter();
		// storeを取得する
		const store = useStore();
		const state = reactive<State>({
			items: [] as ChatCard[],
		});

		/*=============================
		画面初期表示時の処理
		=============================*/
		onMounted(() => {
			// ローディングの表示
			store.dispatch('loading/setLoading', {
				isShow: true,
			});
			const uid = store.state.user.uid;
			const data = {
				uid,
			};
			axios
				.post('v1/rooms/index', data)
				.then((response) => {
					// 取得ルーム情報をstateにセット
					for (let i = 0; i < response.data.rooms.length; i++) {
						let roomData: ChatCard = {
							roomId: response.data.rooms[i].roomId,
							username: response.data.rooms[i].userName,
							timestamp: response.data.rooms[i].updatedAt,
							message: response.data.rooms[i].latestMessage,
						};
						state.items.push(roomData);
					}
				})
				.catch((error) => {
					// トークルームが0件の場合の処理
					if (error.response.data.errorDetail === 'cannotGetRooms') {
						store.dispatch('toast/setToastShow', {
							message: MessageManager(
								Messages.MSG_000,
								'トークルームがありません。'
							),
							toastType: 'warning',
							isShow: true,
						});
					} else {
						store.dispatch('toast/setToastShow', {
							message: MessageManager(Messages.SYS_ERROR),
							toastType: 'danger',
							isShow: true,
						});
					}
					// トーストを2秒表示し、消す
					setTimeout(() => {
						store.dispatch('toast/setToastShow', {
							message: '',
							toastType: '',
							isShow: false,
						});
					}, 2000);
				})
				.finally(() => {
					setTimeout(() => {
						// ローディングの削除
						store.dispatch('loading/setLoading', {
							isShow: false,
						});
					}, 1000);
				});
		});

		// 各チャットルーム押下時の処理
		const onclickChatRoom = (roomId: string) => {
			router.push(`/rooms/${roomId}`);
		};

		return {
			state,
			onclickChatRoom,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	チャット一覧ページwrapper
 ----------------------*/
.chat--index-page-container {
	padding-bottom: 30px;
}

.chat-room-card {
	padding: 12px;
	display: flex;
	position: relative;
	border-radius: 12px;
	margin: 30px auto;
}
.chat-room-card:hover {
	opacity: 0.6;
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
