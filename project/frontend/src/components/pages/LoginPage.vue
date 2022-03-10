<template>
	<div class="page-container">
		<div class="login-title">
			<h2>Login</h2>
		</div>

		<!-- エラーメッセージ表示 -->
		<ErrorList :errorMessages="state.errorMessages" />

		<MainCard color="#fff" height="400px" width="600px" class="login-card">
			<div class="username-form">
				<InputForm
					v-model="state.username"
					ctlName="username"
					labelName="userName"
					:required="true"
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
					:required="true"
					type="password"
					maxlength="20"
					width="400px"
				/>
			</div>
			<CButton
				style="margin-bottom: 5px"
				name="ログイン"
				width="400px"
				colorType="teal"
				:disabled="!state.username || !state.password"
				@click="onclickLogin($event)"
			/>
			<CButton
				style="margin-bottom: 5px"
				name="ゲストログイン"
				width="400px"
				colorType="teal"
				@click="onclickGuestLogin($event)"
			/>
			<CButton
				name="新規登録画面"
				width="400px"
				colorType="primary"
				@click="onclickSignUpLink($event)"
			/>
		</MainCard>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import ErrorList from '@/components/parts/ErrorList.vue';
import InputForm from '@/components/parts/InputForm.vue';
import CButton from '@/components/parts/CButton.vue';
import MainCard from '@/components/parts/MainCard.vue';
import { useAuth } from '@/hooks/useAuth';
import { useValidate } from '@/hooks/useValidate';

interface State {
	username: string;
	password: string;
	errorMessages: Array<String>;
}

export default defineComponent({
	name: 'LoginPage',
	components: {
		ErrorList,
		InputForm,
		CButton,
		MainCard,
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
		// 認証関連の切り出したロジック
		const { doAuth, guestLogin } = useAuth();
		// バリデーション関連
		const { loginValidate } = useValidate();

		// ログインボタン押下時処理
		const onclickLogin = (event: MouseEvent) => {
			event.preventDefault();
			// エラーメッセージ初期化
			state.errorMessages = [];
			// バリデーション
			state.errorMessages = loginValidate(state.username, state.password);
			// エラー発生時、処理中断
			if (state.errorMessages.length > 0) return;

			// ログイン処理
			doAuth(state.username, state.password, store, router, 'login');
		};

		// ゲストログインボタン押下時処理
		const onclickGuestLogin = (event: MouseEvent) => {
			event.preventDefault();
			guestLogin(store, router);
		};

		// 新規登録ボタン押下時処理
		const onclickSignUpLink = (event: MouseEvent) => {
			event.preventDefault();
			router.push('/signup');
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

.login-card {
	margin: 30px auto;
}

.username-form {
	margin-top: 30px;
}
</style>
