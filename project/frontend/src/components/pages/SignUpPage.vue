<template>
	<div class="page-container">
		<div class="signup-title">
			<h2>SignUp</h2>
		</div>

		<!-- エラーメッセージ表示 -->
		<ErrorList :errorMessages="state.errorMessages" />

		<div class="signup-card">
			<div class="signup-form">
				<div class="form-label">
					<label>ユーザー名</label>
				</div>
				<div class="input-form">
					<input
						id="username"
						v-model="state.username"
						placeholder="username"
						type="text"
					/>
				</div>
				<div class="form-label">
					<label>パスワード</label>
				</div>
				<div class="input-form">
					<input
						v-model="state.password"
						placeholder="password"
						type="password"
					/>
				</div>
				<div class="form-label">
					<label>パスワード（確認用）</label>
				</div>
				<div class="input-form">
					<input
						v-model="state.passwordConfirm"
						placeholder="passwordConfirm"
						type="password"
					/>
				</div>

				<div class="signup-btn">
					<button @click="onclickSignUp($event)">新規登録</button>
				</div>
			</div>

			<div class="login-link-container">
				<div class="login-link-btn">
					<button @click="onclickLoginLink($event)">ログイン画面へ</button>
				</div>
			</div>
		</div>
		<!-- .signup-card -->
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ErrorList from '@/components/parts/ErrorList.vue';
import { MessageManager, getMessage } from '@/constants/MessageManager';

interface State {
	username: string;
	password: string;
	passwordConfirm: string;
	errorMessages: Array<String>;
}

export default defineComponent({
	name: 'SignUpPage',
	components: {
		ErrorList,
	},
	setup() {
		const state = reactive<State>({
			username: '',
			password: '',
			passwordConfirm: '',
			errorMessages: [],
		});
		// VueRouter
		const router = useRouter();

		// 画面初期表示時の処理
		onMounted(() => {
			focusForm();
		});

		// 新規登録ボタン押下時の処理
		const onclickSignUp = (event: MouseEvent) => {
			event.preventDefault();

			// エラーメッセージオブジェクトの初期化
			state.errorMessages = [];

			// 必須チェック
			if (!state.username) {
				state.errorMessages.push(
					getMessage(MessageManager.MSG_001, ['ユーザー名'])
				);
			}

			// パスワードの必須チェック
			if (!state.password) {
				state.errorMessages.push(
					getMessage(MessageManager.MSG_001, ['パスワード'])
				);
			}

			// 確認用パスワードの必須チェック
			if (!state.password) {
				state.errorMessages.push(
					getMessage(MessageManager.MSG_001, ['確認用パスワード'])
				);
			}

			// エラー発生時、処理中断
			if (state.errorMessages.length > 0) return;

			// TODO: ローディング表示
			// TODO: API処理(defaultで最後にローディング非表示)
			// TODO: storeへログインでdispatch
			// TODO: HOMEへ遷移
		};

		// 新規登録ボタン押下時処理
		const onclickLoginLink = (event: MouseEvent) => {
			event.preventDefault();
			router.push('/login');
		};

		// フォームにフォーカスを当てる
		const focusForm = () => {
			const form = document.getElementById('username');
			form?.focus();
		};

		return {
			state,
			onclickSignUp,
			onclickLoginLink,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.page-container {
	text-align: center;
}

.signup-title {
	margin-top: 20px;
}

/* カード */
.signup-card {
	width: 80%;
	height: 60vh;
	border: 1px solid #333;
	margin: 30px auto;
	box-shadow: 4px 4px gray;
}

/* フォーム関連 */
.signup-form {
	margin-top: 40px;
}
.form-label {
	margin-bottom: 10px;
}
.input-form input {
	margin-bottom: 10px;
	width: 40%;
	padding: 8px;
}

/* ボタン関連 */
.signup-btn {
	margin-top: 5px;
}
.signup-btn button {
	padding: 8px;
	background-color: rgb(91, 155, 155);
	color: #eee;
	font-size: 18px;
	font-weight: bold;
	border-radius: 8px;
	width: 40%;
}
.signup-btn button:hover {
	cursor: pointer;
	opacity: 0.8;
}
.signup-btn button:active {
	width: 39%;
}

/* 新規登録案内関連 */
.login-link-container {
	margin-top: 30px;
}
.login-link-btn button {
	padding: 8px;
	background-color: rgb(103, 129, 212);
	color: #eee;
	font-weight: bold;
	font-size: 18px;
	border-radius: 8px;
	width: 40%;
}
.login-link-btn button:hover {
	cursor: pointer;
	opacity: 0.8;
}
.login-link-btn button:active {
	width: 39%;
}
</style>
