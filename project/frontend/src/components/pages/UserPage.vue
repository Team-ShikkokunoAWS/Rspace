<template>
	<div class="user-page-container">
		<!-- 背景・ユーザーアイコン -->
		<div class="background-image-wrapper" :style="styles">
			<div class="user-info">
				<UserIcon
					class="userIcon"
					width="240px"
					height="240px"
					:backgroundImage="user.iconImage"
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
					{{ user.name }}
				</div>
				<!-- プロフィール欄 -->
				<div class="user-description">
					{{ user.description }}
				</div>
				<!-- 編集ページ遷移ボタン -->
				<div class="user-edit-page-link" v-if="currentUser.uid === user.uid">
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
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import axios from '@/plugins/axios';
import UserIcon from '@/components/parts/UserIcon.vue';
import CButton from '@/components/parts/CButton.vue';
import MainCard from '@/components/parts/MainCard.vue';

export default defineComponent({
	name: 'UserPage',
	components: {
		UserIcon,
		CButton,
		MainCard,
	},
	setup() {
		// storeを取得する
		const store = useStore();
		const currentUser = computed(() => store.state.user);
		// VueRouter
		const router = useRouter();

		// mockData(ゲストユーザーでログイン状態は編集ページリンクが出る)
		const user = {
			uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
			name: 'ゲストユーザー',
			description:
				'自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。自己紹介が入ります。',
			iconImage: 'img.jpg',
			backImage: 'backImg.jpg',
		};

		// CSS
		const styles = computed(() => {
			return {
				'--backgroundImage': `url(${user.backImage})`,
			};
		});

		// ユーザー編集ページへのリンク押下時の処理
		const onclickEditPage = (uid: string) => {
			router.push(`/users/${uid}/edit`);
		};

		return {
			user,
			currentUser,
			styles,
			onclickEditPage,
		};
	},

	/*====================================
	 * 遷移完了前のバリデーション
	 ====================================*/
	beforeRouteEnter(to, from, next) {
		// ルーティングのuidを取得
		const uid = to.params.uid;
		axios
			.post('v1/users/show', { uid: uid })
			.then((response) => {
				console.log(response);
				// マイページへ遷移
				next();
			})
			.catch((error) => {
				console.log(error);
				next('/404NotFound');
			});
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
	margin: 30px auto;
	/* 文字関連 */
	font-size: 24px;
}

/* 編集ページ */
.user-edit-page-link {
	margin: 30px auto;
}
</style>
