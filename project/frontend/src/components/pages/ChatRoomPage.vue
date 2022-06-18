<template>
	<!-- チャット相手の情報および戻るボタン箇所 -->
	<div class="chat-user-info-wrapper">
		<fa-icon class="exit-btn" icon="angles-left" @click="onclickBack" />
		<p class="chat-user-name">チャット相手の名前</p>
	</div>
	<!-- チャット内容を表示する領域 -->
	<div id="message-field-wrapper">
		<div v-for="item in state.items" :key="item.messageId">
			<MessageBallon
				class="messageBallon"
				:messageId="item.messageId"
				:message="item.message"
				:uid="item.uid"
				:iconImage="item.iconImage"
				:createdAt="item.createdAt"
			/>
		</div>
	</div>
	<!-- メッセージ入力フォームおよび送信ボタンフォーム -->
	<div id="textareaForm" class="form-field-wrapper">
		<TextAreaForm
			v-model="state.message"
			class="message-form"
			ctlName="messageForm"
			focus="true"
			width="100%"
			height="60px"
			@onclickSubmit="sendMessage"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	reactive,
	computed,
	onMounted,
	onUnmounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
// import { MessageManager, Messages } from '@/constants/MessageManager';
import TextAreaForm from '@/components/parts/TextAreaForm.vue';
import MessageBallon from '@/components/parts/MessageBallon.vue';
import axios from '@/plugins/axios';

interface State {
	message: string;
	items: Message[];
	otherUserUid: string;
}

interface Message {
	uid?: string;
	roomId?: string;
	messageId?: number;
	iconImage?: string;
	message?: string;
	createdAt?: string;
}

export default defineComponent({
	name: 'ChatRoomPage',
	components: {
		TextAreaForm,
		MessageBallon,
	},
	setup() {
		const state = reactive<State>({
			message: '',
			items: [] as Message[],
			otherUserUid: '',
		});
		// VueRouter
		const route = useRoute();
		const router = useRouter();
		// storeを取得する
		const store = useStore();
		const currentUser = computed(() => store.state.user);
		const uid = currentUser.value.uid;
		const iconImage = currentUser.value.iconImage;

		// setIntervalを解除するためのID
		let nIntervId: any;

		/*=============================
		画面表示時の処理
		=============================*/
		onMounted(() => {
			// ローディングの表示
			store.dispatch('loading/setLoading', {
				isShow: true,
			});
			// URLからルームID取得
			const roomId: string = String(route.params.room_id);
			const data = {
				roomId,
			};
			// TODO: 相手のユーザー名、相手のUIDを取得するためのAPIを叩く処理追加
			axios
				.post('v1/messages/all-messages', data)
				.then((response) => {
					console.log(response);
					// 取得メッセージ情報をstateにセット
					response.data.messages.forEach((item: any) => {
						const message: Message = {
							uid: item.uid,
							messageId: item.id,
							message: item.message,
							createdAt: item.createdAt,
						};
						state.items.push(message);
					});
				})
				.catch((error) => {
					console.log(error);
					// エラー処理
					// if (error.response.data.errorDetail === 'illegalRoomId') {
					// 	store.dispatch('toast/setToastShow', {
					// 		message: MessageManager(
					// 			Messages.MSG_000,
					// 			'トークルームがありません。'
					// 		),
					// 		toastType: 'warning',
					// 		isShow: true,
					// 	});
					// 	// 他人同士のルームに遷移している場合、ルーム一覧へ遷移させる。
					// 	router.push('/rooms');
					// } else {
					// 	store.dispatch('toast/setToastShow', {
					// 		message: MessageManager(Messages.SYS_ERROR),
					// 		toastType: 'danger',
					// 		isShow: true,
					// 	});
					// }
					// トーストを2秒表示し、消す
					// setTimeout(() => {
					// 	store.dispatch('toast/setToastShow', {
					// 		message: '',
					// 		toastType: '',
					// 		isShow: false,
					// 	});
					// }, 2000);
				})
				.finally(() => {
					setTimeout(() => {
						// ローディングの削除
						store.dispatch('loading/setLoading', {
							isShow: false,
						});
					}, 1000);
				});
			// メッセージ表示領域の最下部を表示する = 最新メッセージを表示する
			moveLatestMessage();
			// 10秒に一回未読メッセージを取得するイベントリスナー追加 & 解除用インターバルIDを変数に格納
			nIntervId = window.setInterval(() => getUnReadMessages(roomId), 10000);
		});

		/*=============================
		未読メッセージの取得処理
		=============================*/
		// TODO: バックエンドの求めるUIDとフロントの送信するUIDが一致していないので注意
		const getUnReadMessages = (roomId: string) => {
			const data = {
				roomId: roomId,
				uid: uid,
			};
			axios.post('v1/messages/unread-messages', data).then((response) => {
				// TODO: レスポンスをstateに追加する処理のレスポンス確認
				const newMessage: Message = {
					uid: response.data.message.uid,
					messageId: response.data.message.id,
					iconImage: response.data.message.iconImage,
					message: response.data.message.message,
					createdAt: response.data.message.createdAt,
				};
				state.items.push(newMessage);
			});
		};

		/*=============================
 		送信ボタン押下時の処理
		=============================*/
		const sendMessage = () => {
			// message未入力時は送信しない
			if (!state.message) return;

			// message送信処理
			// URLからルームID取得
			const roomId: string = String(route.params.room_id);
			const newMessage: Message = {
				uid: uid,
				roomId: roomId,
				iconImage: iconImage,
				message: state.message,
			};
			axios.post('v1/messages/create', newMessage).then((response) => {
				// TODO: レスポンスをstateに追加する処理のレスポンス確認
				const newMessage: Message = {
					uid: response.data.message.uid,
					messageId: response.data.message.id,
					iconImage: response.data.message.iconImage,
					message: response.data.message.message,
					createdAt: response.data.message.createdAt,
				};
				state.items.push(newMessage);
			});
			// messageテキストエリアをクリアにする
			state.message = '';
			// 最新のメッセージを表示する
			moveLatestMessage();
		};

		/*=============================
		 戻るボタン押下時の処理
		=============================*/
		const onclickBack = () => {
			router.push('/rooms');
		};

		/*=============================
		メッセージ表示領域の最下部へ遷移させる
		=============================*/
		const moveLatestMessage = () => {
			setTimeout(() => {
				const messageFiled = document.getElementById('message-field-wrapper');
				const height = messageFiled?.scrollHeight;
				messageFiled?.scroll(0, Number(height));
			});
		};

		/*=============================
		ページを離れる前の処理
		=============================*/
		onUnmounted(() => window.clearInterval(nIntervId));

		return {
			state,
			sendMessage,
			onclickBack,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	wrapper
 ----------------------*/
/* チャット相手の情報欄 */
.chat-user-info-wrapper {
	width: 100%;
	height: 80px;
	margin: 0;
	box-sizing: border-box;
	position: relative;
	color: #ddd;
	background-color: #415566;
	border-bottom: 1px solid #ccc;
}
/* メッセージ表示領域の欄 */
#message-field-wrapper {
	width: 100%;
	height: calc(
		100vh - (80px + 80px + 120px + 30px)
	); /** 画面サイズ - (チャット相手情報の高さ80px + チャット入力フォームの高さ80px + ヘッダーの高さ120px + メッセージ表示領域のpadding15px*2) */
	border-bottom: 1px solid #ccc;
	background-color: #415566;
	padding: 15px 20px;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	box-sizing: border-box; /** paddingではみ出る要素を抑える */
}
#message-field-wrapper::-webkit-scrollbar {
	/* Chrome, Safari 対応 */
	display: none;
}
/* フォーム入力欄 */
.form-field-wrapper {
	width: 100%;
	/* height: 80px; heigth:80だと謎の余白がフォーム下に出たので様子見で108pxに設定 */
	height: 108px;
	position: relative;
	background-color: #8491c3;
	background-color: #415566;
}

/*---------------------
	チャット相手情報欄
 ----------------------*/
.chat-user-name {
	margin: 0;
	position: absolute;
	bottom: 12px;
	right: 24px;
	font-weight: bold;
	font-size: 28px;
}

.exit-btn {
	font-size: 36px;
	font-weight: bold;
	position: absolute;
	bottom: 12px;
	left: 24px;
}
.exit-btn:hover {
	opacity: 0.6;
	cursor: pointer;
}

/*---------------------
	メッセージ入力部分
 ----------------------*/
.message-form {
	margin: 0px 0px 10px 10px;
}
</style>
