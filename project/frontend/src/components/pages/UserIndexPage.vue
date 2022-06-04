<template>
	<div class="user--index-page-container">
		<div class="user-index-title">
			<h2>ユーザー一覧</h2>
		</div>

		<div v-if="state.users.length > 0">
			<MainCard
				class="users-card"
				color="#fff"
				height="120px"
				width="640px"
				v-for="user in state.users"
				:key="user.uid"
				@click="onclickUserCard(user.uid)"
			>
				<div class="uesr-info">
					<div class="user-icon">
						<UserIcon
							width="80px"
							height="80px"
							:backgroundImage="user.iconImage"
						/>
					</div>
					<div class="user-name">
						{{ user.name }}
					</div>
					<div class="user-message">
						<fa-icon
							class="direct-message-btn"
							icon="square-envelope"
							@click.stop="onclickMessageRoom(user.uid)"
						/>
					</div>
				</div>
			</MainCard>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { User } from '@/types/user';
import { MessageManager, Messages } from '@/constants/MessageManager';
import MainCard from '@/components/parts/MainCard.vue';
import UserIcon from '@/components/parts/UserIcon.vue';
import axios from '@/plugins/axios';

interface State {
	users: Array<User>;
}

export default defineComponent({
	name: 'UserIndexPage',
	components: {
		MainCard,
		UserIcon,
	},
	setup() {
		// VueRouter
		const router = useRouter();
		// storeを取得する
		const store = useStore();
		const state = reactive<State>({
			users: [] as User[],
		});

		/*=============================
		画面初期表示時の処理
		=============================*/
		onMounted(() => {
			window.addEventListener('scroll', onScroll);
			// ローディングの表示
			store.dispatch('loading/setLoading', {
				isShow: true,
			});
			// 送信用データを格納(空のユーザー情報とnextStartの初期値0)
			const data: { nextStart: number } = {
				nextStart: 0,
			};
			axios
				.post('v1/all-users', data)
				.then((response) => {
					// 取得したユーザーを表示
					state.users = response.data.users;
				})
				.catch((error) => {
					console.log(error);
					store.dispatch('toast/setToastShow', {
						message: MessageManager(Messages.SYS_ERROR),
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
				})
				.finally(() => {
					setTimeout(() => {
						// ローディングの削除
						store.dispatch('loading/setLoading', {
							isShow: false,
						});
					}, 1000);
				});
		});

		/*=============================
		画面スクロール時の処理
		=============================*/
		const onScroll = () => {
			const element = document.scrollingElement;
			if (element) {
				const scrollHeight = element.scrollHeight; // スクロール可能部分の画面の高さ
				const windowHeight = element.clientHeight; // 表示画面windowの高さ
				const bottom = scrollHeight - windowHeight; // スクロール最下部 = スクロール可能領域 - 表示windowの高さ
				const scrollY = element.scrollTop; // 現在のスクロールした画面の高さ

				// 画面の底までスクロールされた場合、ユーザーの取得処理を行う
				if (scrollY === bottom) {
					// ローディングの表示
					store.dispatch('loading/setLoading', {
						isShow: true,
					});
					// 送信用データを格納(空のユーザー情報とnextStartの初期値0)
					const data: { nextStart: number } = {
						nextStart: state.users.length,
					};
					axios
						.post('v1/all-users', data)
						.then((response) => {
							// 取得したユーザーを表示
							state.users = [...state.users, ...response.data.users];
						})
						.catch((error) => {
							console.log(error);
							store.dispatch('toast/setToastShow', {
								message: MessageManager(Messages.SYS_ERROR),
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
						})
						.finally(() => {
							setTimeout(() => {
								// ローディングの削除
								store.dispatch('loading/setLoading', {
									isShow: false,
								});
							}, 1000);
						});
				}
			}
		};

		// ユーザーカード押下時の遷移
		const onclickUserCard = (uid: string) => {
			router.push(`/users/${uid}`);
		};

		// DMリンク押下時の処理
		const onclickMessageRoom = (uid: string) => {
			// ローディングの表示
			store.dispatch('loading/setLoading', {
				isShow: true,
			});
			const data = {
				partnerUid: uid,
				clientUid: store.state.user.uid,
			};
			axios
				.post('v1/rooms/create', data)
				.then((response) => {
					router.push(`/rooms/${response.data.room.id}`);
				})
				.catch((error) => {
					console.log(error);
					store.dispatch('toast/setToastShow', {
						message: MessageManager(Messages.SYS_ERROR),
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
				})
				.finally(() => {
					setTimeout(() => {
						// ローディングの削除
						store.dispatch('loading/setLoading', {
							isShow: false,
						});
					}, 1000);
				});
		};

		/*=============================
		ページを離れる前の処理
		=============================*/
		onUnmounted(() => window.removeEventListener('scroll', onScroll));

		return {
			state,
			onclickUserCard,
			onclickMessageRoom,
			onScroll,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	ユーザー一覧ページwrapper
 ----------------------*/
.user--index-page-container {
	padding-bottom: 30px;
}

/*---------------------
	ユーザー一覧タイトル
 ----------------------*/
.user-index-title {
	text-align: center;
}

/*---------------------
	ユーザー一覧カード
 ----------------------*/
.users-card {
	margin: 32px auto;
}
.users-card:hover {
	opacity: 0.6;
	cursor: pointer;
}

/*---------------------
	ユーザーカード内部
 ----------------------*/
.uesr-info {
	position: relative;
}
/* ユーザーアイコン */
.user-icon {
	position: absolute;
	top: 16px;
	left: 16px;
}

/* ユーザー名 */
.user-name {
	position: absolute;
	top: 56px;
	left: 120px;
}

/* DMリンクボタン */
.direct-message-btn {
	position: absolute;
	top: 40px;
	right: 32px;
	font-size: 48px;
	color: #6495ed;
}
.direct-message-btn:hover {
	opacity: 0.6;
	cursor: pointer;
}
</style>
