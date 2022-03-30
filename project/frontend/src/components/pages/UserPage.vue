<template>
	<div class="user-page-container">
		<!-- 背景・ユーザーアイコン -->
		<div class="background-image-wrapper" :style="styles">
			<div class="user-info">
				<UserIcon
					class="userIcon"
					width="240px"
					height="240px"
					:backgroundImage="state.user.iconImage"
				/>
			</div>
		</div>
		<!-- ユーザー名・プロフィール欄(プロフィールは未定) -->
		<div class="user-info-detail">
			<MainCard
				class="user-detail-card"
				width="80%"
				height="500px"
				color="#fff"
			>
				<!-- ユーザー名欄 -->
				<div class="user-name">
					{{ state.user.name }}
				</div>
				<!-- プロフィール欄 -->
				<div class="user-description">
					{{ state.user.description }}
				</div>
				<!-- 編集ページ遷移ボタン -->
				<div
					class="user-edit-page-link"
					v-if="currentUser.uid === state.user.uid"
				>
					<CButton
						name="編集"
						width="400px"
						colorType="primary"
						@click="onclickEditPage(currentUser.uid)"
					/>
				</div>
			</MainCard>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { User } from '@/types/User';
import axios from '@/plugins/axios';
import UserIcon from '@/components/parts/UserIcon.vue';
import CButton from '@/components/parts/CButton.vue';
import MainCard from '@/components/parts/MainCard.vue';

interface State {
	user: User;
}

export default defineComponent({
	name: 'UserPage',
	components: {
		UserIcon,
		CButton,
		MainCard,
	},
	setup() {
		const state = reactive<State>({
			user: {
				uid: '',
				name: '',
				description: '',
				iconImage: '',
				backImage: '',
			},
		});
		// storeを取得する
		const store = useStore();
		const currentUser = computed(() => store.state.user);
		// VueRouter
		const router = useRouter();
		const route = useRoute();

		// CSS
		const styles = computed(() => {
			return {
				'--backgroundImage': `url(${state.user.backImage})`,
			};
		});

		/*====================================
	 * ユーザー情報の取得・表示
	 ====================================*/
		onMounted(() => {
			// URLからuidを取得
			const uid = route.params.uid;
			// APIでユーザー情報を取得
			axios
				.post('v1/users/show', { uid: uid })
				.then((response) => {
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

		// ユーザー編集ページへのリンク押下時の処理
		const onclickEditPage = (uid: string) => {
			router.push(`/users/${uid}/edit`);
		};

		return {
			state,
			currentUser,
			styles,
			onclickEditPage,
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
	width: 60%;
	margin: 30px auto;
	/* 文字関連 */
	font-size: 36px;
	font-weight: bold;
}

/* 自己紹介 */
.user-description {
	width: 60%;
	min-height: 50%;
	margin: 30px auto;
	border: 1px solid #ddd;
	border-radius: 8px;
	/* 文字関連 */
	font-size: 24px;
}

/* 編集ページ */
.user-edit-page-link {
	margin: 30px auto;
}
</style>
