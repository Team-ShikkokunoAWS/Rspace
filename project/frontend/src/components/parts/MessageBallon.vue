<template>
	<!-- ログインユーザーのメッセージ（画面右側に配置） -->
	<div v-if="props.uid === currentUser.uid">
		<div class="message-ballon-wrapper current-user-message" :style="styles">
			<!-- メッセージ -->
			{{ props.message }}
		</div>
	</div>
	<!-- ログインユーザー以外のメッセージ（画面左側に配置） -->
	<div v-else>
		<div>
			<UserIcon width="60px" height="60px" :backgroundImage="props.iconImage" />
			<div class="message-ballon-wrapper other-user-message" :style="styles">
				{{ props.message }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import UserIcon from '@/components/parts/UserIcon.vue';

export default defineComponent({
	name: 'MessageBallon',
	components: {
		UserIcon,
	},
	props: {
		// 送信ユーザーのuid
		uid: {
			type: String,
			default: '',
		},
		// 他ユーザーのアイコン画像
		iconMessage: {
			type: String,
			default: '',
		},
		// 吹き出しに表示するメッセージ
		message: {
			type: String,
			default: '',
		},
		// メッセージの作成時刻
		timestamp: {
			type: String,
			default: '',
		},
		// 吹き出しの横幅(デフォルト値：300px)
		width: {
			type: String,
			default: '300px',
		},
		// 吹き出しの高さ（デフォルト値：100px）
		height: {
			type: String,
			default: '100px',
		},
	},
	setup(props) {
		// storeを取得する
		const store = useStore();
		// ログインユーザー情報の取得
		const currentUser = computed(() => store.state.user);
		const styles = computed(() => {
			return {
				'--width': `${props.width}`,
				'--height': `${props.height}`,
			};
		});
		return {
			props,
			currentUser,
			styles,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
/*---------------------
	吹き出しの共通style
 ----------------------*/
.message-ballon-wrapper {
	width: var(--width);
	height: var(--height);
	border: 1px solid #333;
	padding: 10px;
	color: #ccc;
	border-radius: 16px;
	position: relative;
}

/*---------------------
	ログインユーザーのstyle設定
 ----------------------*/
.current-user-message {
	background-color: #2d2d64;
	margin-left: auto;
	margin-right: 28px;
}
.current-user-message::before {
	content: '';
	position: absolute;
	display: block;
	width: 0;
	height: 0;
	right: -28px;
	top: -12px;
	border-left: 50px solid #2d2d64;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	transform: rotate(-45deg);
}

/*---------------------
	ログインユーザー以外のstyle設定
 ----------------------*/
.other-user-message {
	background-color: #272635;
	margin-left: 70px;
}
.other-user-message::before {
	content: '';
	position: absolute;
	display: block;
	width: 0;
	height: 0;
	left: -16px;
	top: -8px;
	border-right: 30px solid #272635;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	transform: rotate(45deg);
}
</style>
