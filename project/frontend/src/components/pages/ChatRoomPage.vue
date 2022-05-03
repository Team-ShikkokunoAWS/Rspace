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
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import TextAreaForm from '@/components/parts/TextAreaForm.vue';
import MessageBallon from '@/components/parts/MessageBallon.vue';

interface State {
	message: string;
	items: Message[];
}

interface Message {
	uid?: string;
	messageId: string;
	iconImage?: string;
	message?: string;
	createdAt: string;
}

export default defineComponent({
	name: 'ChatRoomPage',
	components: {
		TextAreaForm,
		MessageBallon,
	},
	setup() {
		// mockData
		let items: Message[] = [
			{
				uid: '1',
				messageId: '1',
				iconImage: 'image.jpg',
				message: 'hello1',
				createdAt: '2022-03-04 18:00:00',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				messageId: '2',
				iconImage: 'no_image.jpg',
				message: 'hello2',
				createdAt: '2022-03-04 18:10:12',
			},
			{
				uid: '1',
				messageId: '3',
				iconImage: 'image.jpg',
				message: 'hello3',
				createdAt: '2022-03-04 18:20:13',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				messageId: '4',
				iconImage: 'no_image.jpg',
				message: 'hello4',
				createdAt: '2022-03-04 18:30:54',
			},
			{
				uid: '1',
				messageId: '5',
				iconImage: 'image.jpg',
				message: 'hello5',
				createdAt: '2022-03-04 18:40:32',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				messageId: '6',
				iconImage: 'no_image.jpg',
				message: 'hello6',
				createdAt: '2022-03-04 18:50:32',
			},
			{
				uid: '1',
				messageId: '7',
				iconImage: 'image.jpg',
				message: 'hello7',
				createdAt: '2022-03-04 19:00:00',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				messageId: '8',
				iconImage: 'no_image.jpg',
				message: 'hello8',
				createdAt: '2022-03-04 19:10:12',
			},
			{
				uid: '1',
				messageId: '9',
				iconImage: 'image.jpg',
				message: 'hello9',
				createdAt: '2022-03-04 19:20:13',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				messageId: '10',
				iconImage: 'no_image.jpg',
				message: 'hello10',
				createdAt: '2022-03-04 19:30:54',
			},
			{
				uid: '1',
				messageId: '11',
				iconImage: 'image.jpg',
				message: 'hello11',
				createdAt: '2022-03-04 19:40:32',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				messageId: '12',
				iconImage: 'no_image.jpg',
				message: 'hello12',
				createdAt: '2022-03-04 19:50:32',
			},
		];
		const state = reactive<State>({
			message: '',
			items: items,
		});
		// VueRouter
		const router = useRouter();
		// storeを取得する
		const store = useStore();
		const currentUser = computed(() => store.state.user);
		const uid = currentUser.value.uid;
		const iconImage = currentUser.value.iconImage;

		// 画面表示時の処理
		onMounted(() => {
			// メッセージ表示領域の最下部を表示する = 最新メッセージを表示する
			moveLatestMessage();
		});

		// 送信ボタン押下時の処理
		const sendMessage = () => {
			// message未入力時は送信しない
			if (!state.message) return;

			// message入力時の処理
			// items配列に追加する
			const date = new Date();
			let formatedDate = new Intl.DateTimeFormat('ja-jp', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			}).format(date);
			formatedDate = formatedDate.replaceAll('/', '-');
			const newMessage: Message = {
				uid: uid,
				messageId: String(items.length + 1),
				iconImage: iconImage,
				message: state.message,
				createdAt: String(formatedDate),
			};
			state.items.push(newMessage);
			// messageテキストエリアをクリアにする
			state.message = '';
			// 最新のメッセージを表示する
			moveLatestMessage();
		};

		// 戻るボタン押下時の処理
		const onclickBack = () => {
			router.push('/rooms');
		};

		// メッセージ表示領域の最下部へ遷移させる
		const moveLatestMessage = () => {
			setTimeout(() => {
				const messageFiled = document.getElementById('message-field-wrapper');
				const height = messageFiled?.scrollHeight;
				messageFiled?.scroll(0, Number(height));
			});
		};

		return {
			state,
			items,
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
