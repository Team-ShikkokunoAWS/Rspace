<template>
	<!-- チャット相手の情報および戻るボタン箇所 -->
	<div class="chat-user-info-wrapper">
		<fa-icon class="exit-btn" icon="angles-left" @click="onclickBack" />
		<p class="chat-user-name">チャット相手の名前</p>
	</div>
	<!-- チャット内容を表示する領域 -->
	<div class="message-field-wrapper">
		<div v-for="item in items" :key="item.message_id">
			<MessageBallon
				:message="item.message"
				:uid="item.uid"
				:iconImage="item.iconImage"
				:created_at="item.created_at"
			/>
		</div>
	</div>
	<!-- メッセージ入力フォームおよび送信ボタンフォーム -->
	<div class="form-field-wrapper">
		<!-- v-model="state.message" -->
		<TextAreaForm
			class="message-form"
			ctlName="messageForm"
			focus="true"
			width="100%"
			height="60px"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import TextAreaForm from '@/components/parts/TextAreaForm.vue';
import MessageBallon from '@/components/parts/MessageBallon.vue';

export default defineComponent({
	name: 'ChatRoomPage',
	components: {
		TextAreaForm,
		MessageBallon,
	},
	setup() {
		// VueRouter
		const router = useRouter();

		// mockData
		const items = [
			{
				uid: '1',
				message_id: '1',
				iconImage: 'image.jpg',
				message: 'hello1',
				created_at: '2022-03-04 18:00',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				message_id: '2',
				iconImage: 'no_image.jpg',
				message: 'hello2',
				created_at: '2022-03-04 18:10',
			},
			{
				uid: '1',
				message_id: '3',
				iconImage: 'image.jpg',
				message: 'hello3',
				created_at: '2022-03-04 18:20',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				message_id: '4',
				iconImage: 'no_image.jpg',
				message: 'hello4',
				created_at: '2022-03-04 18:30',
			},
			{
				uid: '1',
				message_id: '5',
				iconImage: 'image.jpg',
				message: 'hello5',
				created_at: '2022-03-04 18:40',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				message_id: '6',
				iconImage: 'no_image.jpg',
				message: 'hello6',
				created_at: '2022-03-04 18:50',
			},
			// テスト
			{
				uid: '1',
				message_id: '1',
				iconImage: 'image.jpg',
				message: 'hello1',
				created_at: '2022-03-04 18:00',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				message_id: '2',
				iconImage: 'no_image.jpg',
				message: 'hello2',
				created_at: '2022-03-04 18:10',
			},
			{
				uid: '1',
				message_id: '3',
				iconImage: 'image.jpg',
				message: 'hello3',
				created_at: '2022-03-04 18:20',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				message_id: '4',
				iconImage: 'no_image.jpg',
				message: 'hello4',
				created_at: '2022-03-04 18:30',
			},
			{
				uid: '1',
				message_id: '5',
				iconImage: 'image.jpg',
				message: 'hello5',
				created_at: '2022-03-04 18:40',
			},
			{
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				message_id: '6',
				iconImage: 'no_image.jpg',
				message: 'hello6',
				created_at: '2022-03-04 18:50',
			},
			// テスト
		];

		// 戻るボタン押下時の処理
		const onclickBack = () => {
			router.push('/rooms');
		};
		return {
			items,
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
.message-field-wrapper {
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
.message-field-wrapper::-webkit-scrollbar {
	/* Chrome, Safari 対応 */
	display: none;
}
/* フォーム入力欄 */
.form-field-wrapper {
	width: 100%;
	/* height: 80px; heigth:80だと謎の余白がフォーム下に出たので様子見で108pxに設定*/
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
