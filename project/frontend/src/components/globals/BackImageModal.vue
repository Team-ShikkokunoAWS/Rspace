<template>
	<Overlay v-show="modal.isShow" class="overlay" @click.self="onclickCancel()">
		<div class="modal-wrapper">
			<!-- プレビューゾーン -->
			<div
				id="backPreview"
				class="image-preview-zone"
				@dragenter="dragEnter()"
				@dragleave="dragLeave()"
				@dragover.prevent
				@drop.prevent="dropFile($event)"
			>
				ファイルアップロード
			</div>
			<div class="submit-zone">
				<div class="cancel-btn" @click="onclickCancel()">キャンセル</div>
				<div class="ok-btn" @click="onclickOk()">OK</div>
			</div>
		</div>
	</Overlay>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from '@/store';
import Overlay from '@/components/parts/Overlay.vue';

interface State {
	files: any[];
	objectURL: string;
}

export default defineComponent({
	name: 'BackImageModal',
	components: {
		Overlay,
	},
	setup() {
		// 状態管理
		const store = useStore();
		const modal = store.state.backImageModal;

		const state = reactive<State>({
			files: [],
			objectURL: '',
		});

		/*---------------------
      ドラッグイン時の処理
    ----------------------*/
		const dragEnter = () => {
			// 枠線の色を変更するクラスを付与
			const target = document.getElementById('backPreview');
			target?.classList.add('enter');
		};

		/*---------------------
      ドラッグアウト時の処理
    ----------------------*/
		const dragLeave = () => {
			// 枠線の色を変更するクラスを削除
			const target = document.getElementById('backPreview');
			target?.classList.remove('enter');
		};

		/*---------------------
      ドロップした時の処理
    ----------------------*/
		const dropFile = (event: any) => {
			// 枠線の色を変更するクラスを削除
			const target = document.getElementById('backPreview');
			target?.classList.remove('enter');

			// ファイル情報の読み取り
			state.files = [...event.dataTransfer.files];

			// ファイル形式チェック処理: jpg, jpeg, png以外の場合、処理中断
			if (
				state.files[0].type !== 'image/jpg' &&
				state.files[0].type !== 'image/jpeg' &&
				state.files[0].type !== 'image/png'
			) {
				store.dispatch('toast/setToastShow', {
					message:
						'選択できる形式はjpg, jpeg, pngとなっております。再度お試しください。',
					toastType: 'danger',
					isShow: true,
				});
				// トーストを2秒表示し、消す
				setTimeout(() => {
					store.dispatch('toast/setToastShow', {
						message: '',
						toastType: '',
						isShow: false,
					});
				}, 4000);
				return;
			}

			// ローカルURLを作成
			const objectURL = window.URL.createObjectURL(state.files[0]);
			state.objectURL = objectURL;
			// previewする要素を取得
			const preview = document.getElementById('backPreview');
			if (preview !== null && preview !== undefined) {
				preview.style.backgroundImage = `url(${objectURL})`;
				// プレビューゾーンの文字を削除
				preview.innerText = '';
			} else {
				// エラー
				store.dispatch('toast/setToastShow', {
					message: '画像の読み込みができませんでした。再度お試しください',
					toastType: 'danger',
					isShow: true,
				});
				// トーストを2秒表示し、消す
				setTimeout(() => {
					store.dispatch('toast/setToastShow', {
						message: '',
						toastType: '',
						isShow: false,
					});
				}, 2000);
			}
		};

		// OKボタン押下時の処理
		const onclickOk = () => {
			// 画像URLをstoreに保存
			store.dispatch('user/login', {
				uid: store.state.user.uid,
				name: store.state.user.name,
				isLogined: true,
				iconImage: store.state.user.iconImage,
				backImage: state.objectURL,
			});
			// モーダルを閉じる
			onclickCancel();
		};

		// オーバーレイ or キャンセルボタンクリック時の処理
		const onclickCancel = () => {
			const preview = document.getElementById('backPreview');
			if (preview !== null && preview !== undefined) {
				preview.style.backgroundImage = '';
				// ドラッグ＆ドロップ時に削除したinnerTextを再度追加
				preview.innerText = 'ファイルアップロード';
			}
			// モーダルを閉じる
			store.dispatch('backImageModal/setBackImageModal', {
				isShow: false,
			});
		};

		return {
			dragEnter,
			dragLeave,
			dropFile,
			onclickOk,
			onclickCancel,
			modal,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	モーダル全体
----------------------*/
.modal-wrapper {
	width: 90%;
	height: 500px;
	background-color: #eee;
	margin: 50px auto;
	box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.1),
		0px 0px 8px 6px rgba(13, 13, 13, 0.4);
	box-sizing: border-box;
}

/*---------------------
	プレビュー&ドラッグ&ドロップ
----------------------*/
.image-preview-zone {
	width: 100%;
	height: 400px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	object-fit: contain;

	line-height: 400px;
	font-weight: bold;
	font-size: 36px;
	color: #777;
	text-align: center;
	border: 10px solid #777;
	box-sizing: border-box;
}
.enter {
	border: 10px dotted powderblue;
	box-sizing: border-box;
	color: powderblue;
}

/*---------------------
  保存・キャンセルボタン
----------------------*/
.submit-zone {
	height: 100px;
	background-color: #ddd;
	display: flex;
	justify-content: space-between;
	border: 10px solid #777;
	box-sizing: border-box;
	border-top: none;
}

.cancel-btn {
	width: 50%;
	background-color: #999;
	text-align: center;
	line-height: 100px;
	font-weight: bold;
	font-size: 30px;
	color: #eee;
}
.cancel-btn:hover {
	opacity: 0.8;
	cursor: pointer;
}
.cancel-btn:active {
	border: none;
}

.ok-btn {
	width: 50%;
	background-color: #007bff;
	border: 3px solid #007bff;
	text-align: center;
	line-height: 100px;
	font-weight: bold;
	font-size: 30px;
	color: #eee;
}
.ok-btn:hover {
	opacity: 0.8;
	cursor: pointer;
}
.ok-btn:active {
	border: none;
}
</style>
