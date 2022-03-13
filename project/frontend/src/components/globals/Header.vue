<template>
	<div class="header-container">
		<div class="header-title">
			<h1 class="header-title"><span @click="onclickHome">RSpace</span></h1>
			<!-- ハンバーガーメニュー -->
			<div
				v-show="userInfo.name"
				class="btn-trigger"
				id="btn"
				@click="onclickMenu"
				:class="active"
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<!-- ハンバーガーメニュー -->
		</div>
		<!-- ユーザー情報, ログアウトボタン -->
		<div class="header-user-info flex" v-if="userInfo.name">
			<div class="name-and-icon flex" @click="onclickUserName">
				<p>{{ userInfo.name }}</p>
				<UserIcon
					width="60px"
					height="60px"
					:backgroundImage="userInfo.iconImage"
				/>
			</div>
			<div>
				<fa-icon
					icon="arrow-right-from-bracket"
					class="header-logout-btn"
					@click="onclickLogout($event)"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import UserIcon from '@/components/parts/UserIcon.vue';

export default defineComponent({
	name: 'Header',
	components: {
		UserIcon,
	},
	setup() {
		// storeを取得する
		const store = useStore();
		const userInfo = computed(() => store.state.user);
		const active = computed(() => store.state.sidebar.active);

		const router = useRouter();

		// ログアウトボタン押下時の処理
		const onclickLogout = (event: MouseEvent) => {
			event.preventDefault();
			store.dispatch('dialog/setDialog', {
				title: 'ログアウト確認',
				message: 'ログアウトしますか？',
				dialogType: 'logout',
				isShow: true,
			});
		};

		// ハンバーガーメニュー押下時の処理
		const onclickMenu = () => {
			const btn = document.getElementById('btn');
			btn?.classList.toggle('active');
			store.dispatch('sidebar/setSideBar', { active: 'active', isShow: true });
		};

		// タイトル押下時の処理
		const onclickHome = () => {
			router.push('/users');
		};

		// ヘッダーユーザー名押下時の処理
		const onclickUserName = () => {
			router.push(`/user/${userInfo.value.uid}`);
		};

		return {
			userInfo,
			onclickLogout,
			onclickMenu,
			onclickHome,
			onclickUserName,
			active,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.flex {
	display: flex;
}

.header-container {
	width: 100%;
	height: 120px;
	border-bottom: 1.5px solid #333;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
	z-index: 1;
	position: relative;
	background-color: #212a33;
	color: #ddd;
}

.header-title {
	margin-left: 20px;
}

.header-title h1 {
	margin: 0;
}

.header-title h1:hover {
	cursor: pointer;
	opacity: 0.6;
}

.header-user-info {
	position: absolute;
	right: 16px;
	bottom: 5px;
}

.header-user-info p {
	margin: 0;
	font-size: 24px;
	font-weight: bold;
	margin-right: 8px;
}

.name-and-icon {
	height: 60px;
	line-height: 60px;
}

.name-and-icon:hover {
	cursor: pointer;
	opacity: 0.6;
}

.header-logout-btn {
	font-size: 25px;
	line-height: 20px;
	margin-top: 28px;
	margin-left: 10px;
	background-color: #ddd;
	padding: 12px;
	border-radius: 12px;
	background-color: #333;
}
.header-logout-btn:hover {
	cursor: pointer;
	color: #aaa;
}

/*=============================
.btn-trigger
=============================*/
.btn-trigger {
	position: relative;
	width: 44px;
	height: 40px;
	cursor: pointer;
	margin-top: 16px;
}
.btn-trigger:hover {
	opacity: 0.6;
}
.btn-trigger span {
	position: absolute;
	left: 0;
	width: 100%;
	height: 4px;
	/* background-color: #222; */
	border-radius: 4px;
	background-color: #ddd;
}
.btn-trigger,
.btn-trigger span {
	display: inline-block;
	transition: all 0.5s;
	box-sizing: border-box;
}
.btn-trigger span:nth-of-type(1) {
	top: 0;
}
.btn-trigger span:nth-of-type(2) {
	top: 18px;
}
.btn-trigger span:nth-of-type(3) {
	bottom: 0;
}

/*=============================
.animation
=============================*/
#btn.active span:nth-of-type(1) {
	-webkit-transform: translateY(18px) rotate(-45deg);
	transform: translateY(18px) rotate(-45deg);
}
#btn.active span:nth-of-type(2) {
	left: 50%;
	opacity: 0;
	-webkit-animation: active-btn-bar02 0.8s forwards;
	animation: active-btn-bar02 0.8s forwards;
}
@-webkit-keyframes active-btn-bar02 {
	100% {
		height: 0;
	}
}
@keyframes active-btn-bar02 {
	100% {
		height: 0;
	}
}
#btn.active span:nth-of-type(3) {
	-webkit-transform: translateY(-18px) rotate(45deg);
	transform: translateY(-18px) rotate(45deg);
}
</style>
