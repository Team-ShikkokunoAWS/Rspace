<template>
	<div class="page-container">
		<div class="signup-title">
			<h2>SignUp</h2>
		</div>

		<!-- エラーメッセージ表示 -->
		<ErrorList :errorMessages="state.errorMessages" />

		<MainCard color="#fff" height="400px" width="600px">
			<div class="username-form">
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
				style="margin-bottom: 5px"
				name="新規登録"
				width="400px"
				colorType="teal"
				:disabled="!state.username || !state.password || !state.passwordConfirm"
				@click="onclickSignUp($event)"
			/>
			<CButton
				name="ログイン画面"
				width="400px"
				colorType="primary"
				@click="onclickLoginLink($event)"
			/>
		</MainCard>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import ErrorList from '@/components/parts/ErrorList.vue';
import InputForm from '@/components/parts/InputForm.vue';
import CButton from '@/components/parts/CButton.vue';
import MainCard from '@/components/parts/MainCard.vue';
import { useAuth } from '@/hooks/useAuth';
import { useValidate } from '@/hooks/useValidate';

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
		MainCard,
	},
	setup() {
		const state = reactive<State>({
			username: '',
			password: '',
			passwordConfirm: '',
			errorMessages: [],
		});
		// storeを取得する
		const store = useStore();
		// VueRouter
		const router = useRouter();
		// 認証関連
		const { doAuth } = useAuth();
		// バリデーション関連
		const { signUpValidate } = useValidate();

		// 新規登録ボタン押下時の処理
		const onclickSignUp = async (event: MouseEvent) => {
			event.preventDefault();
			// エラーメッセージオブジェクトの初期化
			state.errorMessages = [];
			// バリデーション
			state.errorMessages = signUpValidate(
				state.username,
				state.password,
				state.passwordConfirm
			);
			// エラー発生時、処理中断
			if (state.errorMessages.length > 0) return;

			// 新規登録処理
			doAuth(state.username, state.password, store, router, 'signup');
		};

		// 新規登録ボタン押下時処理
		const onclickLoginLink = (event: MouseEvent) => {
			event.preventDefault();
			router.push('/login');
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

.username-form {
	margin-top: 30px;
}
</style>
