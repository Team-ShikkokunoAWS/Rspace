<template>
	<div class="page-container">
		<div class="signup-title">
			<h2>SignUp</h2>
		</div>

		<!-- エラーメッセージ表示 -->
		<ErrorList :errorMessages="state.errorMessages" />

		<div class="signup-card">
			<div>
				<InputForm
					v-model="state.username"
					ctlName="username"
					labelName="userName"
					required="true"
					type="text"
					maxlength="20"
					focus="true"
					width="400px"
				/>
			</div>
			<div>
				<InputForm
					v-model="state.password"
					ctlName="password"
					labelName="password"
					required="true"
					type="password"
					maxlength="20"
					width="400px"
				/>
			</div>
			<div>
				<InputForm
					v-model="state.passwordConfirm"
					ctlName="passwordConfirm"
					labelName="passwordConfirm"
					required="true"
					type="password"
					maxlength="20"
					width="400px"
				/>
			</div>

			<CButton
				name="ログイン"
				width="400px"
				colorType="teal"
				@click="onclickSignUp($event)"
			/>
			<CButton
				name="ログイン画面"
				width="400px"
				colorType="primary"
				@click="onclickLoginLink($event)"
			/>
		</div>
		<!-- .signup-card -->
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ErrorList from '@/components/parts/ErrorList.vue';
import InputForm from '@/components/parts/InputForm.vue';
import CButton from '@/components/parts/CButton.vue';
import { MessageManager, Messages } from '@/constants/MessageManager';

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
		InputForm,
		CButton,
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
					MessageManager(Messages.MSG_001, 'ユーザー名')
				);
			}

			// パスワードの必須チェック
			if (!state.password) {
				state.errorMessages.push(
					MessageManager(Messages.MSG_001, 'パスワード')
				);
			}

			// 確認用パスワードの必須チェック
			if (!state.password) {
				state.errorMessages.push(
					MessageManager(Messages.MSG_001, '確認用パスワード')
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
	padding-top: 60px;
}
</style>
