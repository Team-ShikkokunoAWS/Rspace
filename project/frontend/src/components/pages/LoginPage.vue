<template>
	<div class="page-container">
		<div class="login-title">
			<h2>Login</h2>
		</div>

		<!-- エラーメッセージ表示 -->
		<ErrorList :errorMessages="state.errorMessages" />

		<div class="login-card">
			<div class="login-form">
				<div class="form-label">
					<label>ユーザー名</label>
				</div>
				<div class="input-form">
					<input
						id="username"
						type="text"
						v-model="state.username"
						placeholder="username"
					/>
				</div>
				<div class="form-label">
					<label>パスワード</label>
				</div>
				<div class="input-form">
					<input
						id="password"
						type="password"
						v-model="state.password"
						placeholder="password"
					/>
				</div>

				<div class="login-btn">
					<button @click="onclickLogin($event)">ログイン</button>
				</div>
				<div class="login-btn">
					<button @click="onclickGuestLogin($event)">ゲストログイン</button>
				</div>
			</div>

			<div class="signup-link-container">
				<div class="signup-link-btn">
					<button @click="onclickSignUpLink($event)">新規登録</button>
				</div>
			</div>
		</div>
		<!-- .login-card -->
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import ErrorList from '@/components/parts/ErrorList.vue';
import { MessageManager, getMessage } from '@/constants/MessageManager';

interface State {
	username: string;
	password: string;
	errorMessages: Array<String>;
}

export default defineComponent({
	name: 'LoginPage',
	components: {
		ErrorList,
	},
	setup() {
		// リアクティブ定義
		const state = reactive<State>({
			username: '',
			password: '',
			errorMessages: [],
		});
		// storeを取得する
		const store = useStore();
		// VueRouter
		const router = useRouter();

		// 画面初期表示時の処理
		onMounted(() => {
			focusForm();
		});

		// ログインボタン押下時処理
		const onclickLogin = (event: MouseEvent) => {
			event.preventDefault();

			// エラーメッセージ初期化
			state.errorMessages = [];

			// ユーザー名の必須チェック
			if (!state.username) {
				state.errorMessages.push(
					getMessage(MessageManager.MSG_001, ['ユーザー名'])
				);
			}

			// ユーザー名の文字数チェック
			if (state.username.length > 20) {
				state.errorMessages.push(
					getMessage(MessageManager.MSG_003, ['ユーザー名', '20'])
				);
			}

			// パスワードの必須チェック
			if (!state.password) {
				state.errorMessages.push(
					getMessage(MessageManager.MSG_001, ['パスワード'])
				);
			}
			// エラー発生時、処理中断
			if (state.errorMessages.length > 0) return;

			// ログイン処理のAPI操作

			// 必須チェックでエラーがない場合、仮で成功メッセージ
			alert('ログイン成功');
		};

		// ゲストログインボタン押下時処理
		const onclickGuestLogin = (event: MouseEvent) => {
			event.preventDefault();
			store.dispatch('login', {
				uuid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				name: 'ゲストユーザー',
				isLogined: true,
			});
			// ローディング表示
			store.dispatch('setLoading', {
				isShow: true,
			});
			// 2秒後、ローディングを解除
			setTimeout(() => {
				store.dispatch('setLoading', {
					isShow: false,
				});
			}, 2000);
			setTimeout(() => {
				// Homeに遷移
				router.push('/');
				// 遷移後、トーストメッセージ表示
				store.dispatch('setToastShow', {
					message: getMessage(MessageManager.MSG_004, ['ログイン']),
					toastType: 'success',
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
			}, 2000);
		};

		// 新規登録ボタン押下時処理
		const onclickSignUpLink = (event: MouseEvent) => {
			event.preventDefault();
			router.push('/signup');
		};

		// フォームにフォーカスを当てる
		const focusForm = () => {
			const form = document.getElementById('username');
			form?.focus();
		};

		return {
			state,
			onclickLogin,
			onclickGuestLogin,
			onclickSignUpLink,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.page-container {
	text-align: center;
}

.login-title {
	margin-top: 20px;
}

/* カード */
.login-card {
	width: 80%;
	height: 60vh;
	border: 1px solid #333;
	margin: 30px auto;
	box-shadow: 4px 4px gray;
}

/* フォーム関連 */
.login-form {
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
.login-btn {
	margin-top: 5px;
}
.login-btn button {
	padding: 8px;
	background-color: rgb(91, 155, 155);
	color: #eee;
	font-size: 18px;
	font-weight: bold;
	border-radius: 8px;
	width: 40%;
}
.login-btn button:hover {
	cursor: pointer;
	background-color: rgb(91, 155, 155, 0.8);
}
.login-btn button:active {
	width: 39%;
}

/* 新規登録案内関連 */
.signup-link-container {
	margin-top: 50px;
}
.signup-link-btn button {
	padding: 8px;
	background-color: rgb(103, 129, 212);
	color: #eee;
	font-weight: bold;
	font-size: 18px;
	border-radius: 8px;
	width: 40%;
}
.signup-link-btn button:hover {
	cursor: pointer;
	background-color: rgb(103, 129, 212, 0.8);
}
.signup-link-btn button:active {
	width: 39%;
}
</style>