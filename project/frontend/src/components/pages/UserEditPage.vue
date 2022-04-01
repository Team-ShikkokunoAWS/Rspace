<template>
	<div class="user-page-container">
		<!-- 背景・ユーザーアイコン -->
		<div class="background-image-wrapper" :style="styles">
			<!-- 背景。ユーザーアイコン編集モーダル呼び出しボタン -->
			<!-- <fa-icon
				icon="pen-to-square"
				class="image-edit-btn"
				@click="showImageEditModal"
			/> -->
			<!-- 背景・ユーザーアイコン編集選択肢リスト -->
			<!-- <div id="imageEditModal" class="image-edit-modal">
				<div class="modal-list">
					<span class="edit-back" @click="onclickEditBackImage()"
						>背景画像を編集する</span
					>
				</div>
				<div class="modal-list">
					<span class="edit-icon" @click="onclickEditIconImage()"
						>アイコン画像を編集する</span
					>
				</div>
			</div> -->
			<div class="user-info">
				<UserIcon
					class="userIcon"
					width="240px"
					height="240px"
					:backgroundImage="state.user.iconImage"
				/>
			</div>
		</div>
		<!-- エラーメッセージ -->
		<ErrorList :errorMessages="state.errorMessages" class="user-edit-center" />
		<div class="user-info-detail">
			<MainCard
				class="user-detail-card"
				width="80%"
				height="650px"
				color="#fff"
			>
				<!-- ユーザー名欄 -->
				<div class="user-name user-edit-margin-top">
					<InputForm
						v-model="state.username"
						ctlName="username"
						labelName="userName"
						type="text"
						maxlength="20"
						focus="true"
						width="400px"
					/>
				</div>
				<!-- 現在のパスワード -->
				<div class="current-password user-edit-margin-top">
					<InputForm
						v-model="state.currentPassword"
						ctlName="currentPassword"
						labelName="currentPassword"
						type="password"
						maxlength="20"
						width="400px"
						:required="
							state.currentPassword ||
							state.newPassword ||
							state.newPasswordConfirm
								? true
								: false
						"
					/>
				</div>
				<!-- 新しいパスワード -->
				<div class="new-password user-edit-margin-top">
					<InputForm
						v-model="state.newPassword"
						ctlName="newPassword"
						labelName="newPassword"
						type="password"
						maxlength="20"
						width="400px"
						:required="
							state.currentPassword ||
							state.newPassword ||
							state.newPasswordConfirm
								? true
								: false
						"
					/>
				</div>
				<!-- 新しいパスワード（確認用）パスワード -->
				<div class="new-password-confirm user-edit-margin-top">
					<InputForm
						v-model="state.newPasswordConfirm"
						ctlName="newPasswordConfirm"
						labelName="newPasswordConfirm"
						type="password"
						maxlength="20"
						width="400px"
						:required="
							state.currentPassword ||
							state.newPassword ||
							state.newPasswordConfirm
								? true
								: false
						"
					/>
					<!-- TODO: プロフィール欄 -->
				</div>
				<div class="user-edit-page-link">
					<CButton
						name="保存する"
						width="400px"
						colorType="teal"
						:disabled="
							state.user.name !== state.username ||
							(state.currentPassword &&
								state.newPassword &&
								state.newPasswordConfirm)
								? false
								: true
						"
						@click="onclickEditBtn"
					/>
				</div>
			</MainCard>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onMounted } from 'vue';
import { useValidate } from '@/hooks/useValidate';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { User } from '@/types/user';
import { MessageManager, Messages } from '@/constants/MessageManager';
import axios from '@/plugins/axios';
import ErrorList from '@/components/parts/ErrorList.vue';
import InputForm from '@/components/parts/InputForm.vue';
import UserIcon from '@/components/parts/UserIcon.vue';
import CButton from '@/components/parts/CButton.vue';
import MainCard from '@/components/parts/MainCard.vue';

interface State {
	user: User;
	username: string;
	description: string;
	currentPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
	errorMessages: Array<String>;
}

export default defineComponent({
	name: 'UserEditPage',
	components: {
		ErrorList,
		InputForm,
		UserIcon,
		CButton,
		MainCard,
	},
	setup() {
		// 状態管理
		const store = useStore();

		const state = reactive<State>({
			user: {
				uid: '',
				name: '',
				description: '',
				iconImage: '',
				backImage: '',
			},
			username: store.state.user.name, // 初期値にcookieの値を設定
			description: '',
			currentPassword: '',
			newPassword: '',
			newPasswordConfirm: '',
			errorMessages: [],
		});

		// router
		const route = useRoute();
		const router = useRouter();

		// バリデーション関連
		const { updateUserValidate } = useValidate();

		// CSS
		const styles = computed(() => {
			return {
				'--backgroundImage': `url(${store.state.user.backImage})`,
			};
		});

		/*====================================
	 * ユーザー情報の取得
	 ====================================*/
		onMounted(() => {
			// URLからuidを取得
			const uid = route.params.uid;
			// APIでユーザー情報を取得
			axios
				.post('v1/users/show', { uid: uid })
				.then((response) => {
					// cookieのuidとURLのuidが一致しない場合、404ページへ遷移させる
					if (store.state.user.uid !== response.data.user.uid) {
						router.push('/404NotFound');
						// 遷移後、トーストメッセージ表示
						store.dispatch('toast/setToastShow', {
							message: 'ユーザー情報を再度ご確認ください。',
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
					// 取得データを表示用データとして格納する
					state.user = response.data.user;
				})
				.catch((err) => {
					console.log(err);
					router.push('/404NotFound');
					if (err.response.data.error_detail === 'illegal_uid') {
						// 遷移後、トーストメッセージ表示
						store.dispatch('toast/setToastShow', {
							message: 'ユーザー情報を再度ご確認ください。',
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
				});
		});

		// 画像関連編集モーダル呼び出しボタン押下時の処理
		const showImageEditModal = () => {
			const target = document.getElementById('imageEditModal');
			target?.classList.toggle('active');
		};

		// 背景画像編集リンク押下時の処理
		const onclickEditBackImage = () => {
			store.dispatch('backImageModal/setBackImageModal', {
				isShow: true,
			});
			// モーダルメニューの削除
			const target = document.getElementById('imageEditModal');
			target?.classList.remove('active');
		};

		// アイコン画像編集リンク押下時の処理
		const onclickEditIconImage = () => {
			store.dispatch('iconImageModal/setIconImageModal', {
				isShow: true,
			});
			// モーダルメニューの削除
			const target = document.getElementById('imageEditModal');
			target?.classList.remove('active');
		};

		// 保存するボタン押下時の処理
		const onclickEditBtn = () => {
			// バリデーション
			state.errorMessages = [];
			state.errorMessages = updateUserValidate(
				state.username,
				state.currentPassword,
				state.newPassword,
				state.newPasswordConfirm
			);
			// ローディング表示
			store.dispatch('loading/setLoading', {
				isShow: true,
			});
			// 処理
			axios
				.post('v1/users/update', {
					uid: state.user.uid,
					name: state.username,
					description: state.user.description,
					currentPassword: state.currentPassword,
					newPassword: state.newPassword,
				})
				.then((response) => {
					console.log(response);
					const responseUser: User = response.data.user;
					setTimeout(() => {
						// 返却されたユーザー情報をstoreに登録
						store.dispatch('user/setUser', {
							uid: responseUser.uid,
							name: responseUser.name,
							description: responseUser.description,
							isLogined: true,
							iconImage: responseUser.iconImage,
							backImage: responseUser.backImage,
						});
						// フォームにstoreの値を再設定
						state.user = responseUser;
						// loading削除
						store.dispatch('loading/setLoading', {
							isShow: false,
						});
						// トースト(success)
						store.dispatch('toast/setToastShow', {
							message: MessageManager(Messages.MSG_004, ['ユーザー情報を更新']),
							toastType: 'success',
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
						// フォームを再設定
						state.username = store.state.user.name;
						state.currentPassword = '';
						state.newPassword = '';
						state.newPasswordConfirm = '';
					}, 1000);
				})
				.catch((err) => {
					console.log(err);
					// フォームはそのまま
					// loading削除
					// トースト(danger)
					// current_password_error 現在のパスワードが間違っているエラー
					// already_regist そのユーザー名はすでに登録されていますエラー
					// illegal_uid 現在ログインしているユーザーが見つからないエラー
					// システムエラー
				});
		};

		return {
			styles,
			state,
			showImageEditModal,
			onclickEditBackImage,
			onclickEditIconImage,
			onclickEditBtn,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	ユーザーページwrapper
 ----------------------*/
.user-page-container {
	padding-bottom: 30px;
}
/*---------------------
	ユーザーアイコン・ユーザー背景表示領域部分
 ----------------------*/
/* ユーザー背景 */
.background-image-wrapper {
	width: 100%;
	height: 400px;
	background-color: #ddd;
	background-image: var(--backgroundImage);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	position: relative;
}
/* ユーザーアイコン */
.userIcon {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
}
/* 画像関連編集選択肢モーダル呼び出しボタン */
.image-edit-btn {
	/* 配置 */
	position: absolute;
	top: 20px;
	right: 20px;
	z-index: 10;
	/* 文字サイズ/色 */
	font-size: 24px;
	color: #eee;
	background-color: #333;
	padding: 8px;
	border-radius: 8px;
}
.image-edit-btn:hover {
	cursor: pointer;
	opacity: 0.6;
}
/* 画像関連編集選択肢モーダル */
.image-edit-modal {
	position: absolute;
	z-index: 10;
	top: 64px;
	right: 64px;
	border-radius: 8px;
	box-shadow: 0px 8px 16px -2px rgba(10, 10, 10, 0.1),
		0px 0px 8px 8px rgba(13, 13, 13, 0.14);
	padding: 8px;
	background-color: #eee;
	display: none;
}
/* 画像関連編集選択肢 */
.modal-list {
	margin-top: 8px;
	margin-bottom: 8px;
	font-size: 16px;
}
.modal-list span:hover {
	opacity: 0.6;
	border-bottom: 1px solid #666;
	cursor: pointer;
}
/* 画像関連編集選択肢モーダルの表示クラス */
.active {
	display: block;
}

/*---------------------
	ユーザー名・ユーザープロフィール・編集ボタン
 ----------------------*/
/* カードコンポーネント */
.user-detail-card {
	text-align: center;
	margin: 60px auto;
}

/* ユーザー名 */
.user-name {
	margin-top: 60px;
}

/* 編集ページ */
.user-edit-page-link {
	margin: 30px auto;
}

/*---------------------
  util
 ----------------------*/
.user-edit-margin-top {
	margin-top: 40px;
}

.user-edit-center {
	text-align: center;
}
</style>
