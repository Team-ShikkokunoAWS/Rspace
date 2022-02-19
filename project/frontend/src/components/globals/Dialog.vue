<template>
	<div v-show="dialog.isShow" class="overlay" @click="onclickCancel">
		<div class="dialog-wrapper grid">
			<div class="dialog-title">
				<h2>{{ dialog.title }}</h2>
			</div>

			<div class="dialog-message">
				<p>{{ dialog.message }}</p>
			</div>

			<div class="dialog-btn-wrapper">
				<div class="dialog-cancel-btn" @click="onclickCancel">キャンセル</div>
				<div class="dialog-ok-btn" @click="onclickOk">OK</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import { MessageManager, Messages } from '@/constants/MessageManager';

export default defineComponent({
	name: 'Dialog',
	setup() {
		// ルーティング
		const router = useRouter();
		// 状態管理
		const store = useStore();
		const dialog = store.state.dialog;

		// OKボタン押下時の処理
		const onclickOk = () => {
			const dialogType = dialog.dialogType;
			switch (dialogType) {
				// ログアウト時の処理
				case 'logout':
					// 遷移後、トーストの表示
					store.dispatch('setToastShow', {
						message: MessageManager(Messages.MSG_004, ['ログアウト']),
						toastType: 'danger',
						isShow: true,
					});
					// トーストを2秒表示し、消す
					setTimeout(() => {
						store.dispatch('setToastShow', {
							message: '',
							toastType: '',
							isShow: false,
						});
					}, 2000);
					// ログアウト処理
					store.dispatch('logout');
					router.push('/login');
					break;
			}
		};

		// キャンセル・オーバーレイ押下時にダイアログを消す
		const onclickCancel = () => {
			store.dispatch('setDialog', {
				title: '',
				message: '',
				isShow: false,
			});
		};

		return {
			dialog,
			onclickOk,
			onclickCancel,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/* 画面全体を黒くするオーバーレイ */
.overlay {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 9999;
}

.grid {
	display: grid;
	grid-template-rows: 50px 150px 100px;
}

.dialog-wrapper {
	width: 60%;
	height: 300px;
	border: 6px solid teal;
	border-radius: 12px;
	margin: 10vh auto;
	background-color: #eee;
}

.dialog-title {
	width: 100%;
	background-color: teal;
}

.dialog-title h2 {
	margin: 0;
	text-align: center;
	line-height: 50px;
	color: #eee;
}

.dialog-message {
	grid-row: 2 / 3;
	text-align: center;
	line-height: 150px;
}

.dialog-message p {
	font-size: 24px;
	font-weight: bold;
	margin: 0;
}

.dialog-btn-wrapper {
	grid-row: 3 / 3;
	background-color: #ddd;
	padding: 10px;
	display: flex;
	justify-content: space-between;
}

.dialog-cancel-btn {
	width: 48%;
	background-color: #dc3545;
	border: 3px solid #dc3545;
	text-align: center;
	line-height: 80px;
	border-radius: 12px;
	font-weight: bold;
	font-size: 30px;
	color: #eee;
}
.dialog-cancel-btn:hover {
	opacity: 0.8;
	cursor: pointer;
}
.dialog-cancel-btn:active {
	border: none;
}

.dialog-ok-btn {
	width: 48%;
	border-radius: 12px;
	background-color: #007bff;
	border: 3px solid #007bff;
	text-align: center;
	line-height: 80px;
	font-weight: bold;
	font-size: 30px;
	color: #eee;
}
.dialog-ok-btn:hover {
	opacity: 0.8;
	cursor: pointer;
}
.dialog-ok-btn:active {
	border: none;
}
</style>
