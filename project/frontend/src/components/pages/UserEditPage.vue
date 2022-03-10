<template>
	<div class="user-page-container">
		<!-- 背景・ユーザーアイコン -->
		<div
			class="background-image-wrapper"
			:style="styles"
			@click="onclickBackgroundImage"
		>
			<!-- 背景。ユーザーアイコン編集モーダル呼び出しボタン -->
			<fa-icon
				icon="pen-to-square"
				class="image-edit-btn"
				@click="showImageEditModal"
			/>
			<!-- 背景・ユーザーアイコン編集選択肢リスト -->
			<div id="imageEditModal" class="image-edit-modal">
				<div class="modal-list">
					<span class="edit-back">背景画像を編集する</span>
				</div>
				<div class="modal-list">
					<span class="edit-icon">アイコン画像を編集する</span>
				</div>
			</div>
			<div class="user-info">
				<UserIcon
					class="userIcon"
					width="240px"
					height="240px"
					:backgroundImage="user.iconImage"
					@click.stop="onclickIconImage"
				/>
			</div>
		</div>
		<!-- エラーメッセージ -->
		<ErrorList :errorMessages="state.errorMessages" class="user-edit-center" />
		<!-- ユーザー名・プロフィール欄(プロフィールは未定) -->
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
							state.newPassword || state.newPasswordConfirm ? true : false
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
							state.currentPassword || state.newPasswordConfirm ? true : false
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
							state.currentPassword || state.newPassword ? true : false
						"
					/>
				</div>
				<div class="user-edit-page-link">
					<CButton
						name="保存する"
						width="400px"
						colorType="teal"
						@click="onclickEditBtn"
					/>
				</div>
			</MainCard>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue';
import ErrorList from '@/components/parts/ErrorList.vue';
import InputForm from '@/components/parts/InputForm.vue';
import UserIcon from '@/components/parts/UserIcon.vue';
import CButton from '@/components/parts/CButton.vue';
import MainCard from '@/components/parts/MainCard.vue';

interface State {
	username: string;
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
		// mockData
		const user = {
			uid: 'test-test-test-1',
			name: 'test1',
			description:
				'lorem ipsum dolor sit amet lorem ipsum dolor sit lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor ¥r¥n lorem ipsum dolor sit amet lorem ipsum dolor sit lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor ¥r¥n lorem ipsum dolor sit amet lorem ipsum dolor sit lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor ¥r¥n',
			iconImage: 'img.jpg',
			backImage: 'backImg.jpg',
		};

		// CSS
		const styles = computed(() => {
			return {
				'--backgroundImage': `url(${user.backImage})`,
			};
		});

		const state = reactive<State>({
			username: user.name,
			currentPassword: '',
			newPassword: '',
			newPasswordConfirm: '',
			errorMessages: [],
		});

		// 画像関連編集モーダル呼び出しボタン押下時の処理
		const showImageEditModal = () => {
			const target = document.getElementById('imageEditModal');
			target?.classList.toggle('active');
		};

		// 保存するボタン押下時の処理
		const onclickEditBtn = () => {};

		return {
			user,
			styles,
			state,
			onclickEditBtn,
			showImageEditModal,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
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
