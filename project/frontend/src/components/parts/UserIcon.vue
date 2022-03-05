<template>
	<div v-show="userInfo.isLogined">
		<!-- ユーザーのアイコン画像が設定されている場合、設定画像パスでアイコンを表示 -->
		<div
			v-if="
				userInfo.iconImage !== '' &&
				userInfo.iconImage !== null &&
				userInfo.iconImage !== undefined
			"
		>
			<div class="user-icon user-image" :style="styles"></div>
		</div>
		<!-- ユーザーのアイコン画像が未設定の場合、no_image.jpgでアイコンを表示 -->
		<div
			v-if="
				userInfo.iconImage === '' ||
				userInfo.iconImage === null ||
				userInfo.iconImage === undefined
			"
		>
			<div class="user-icon no-image" :style="styles"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: 'UserIcon',
	props: {
		width: {
			type: String,
			default: '80px',
		},
		height: {
			type: String,
			default: '80px',
		},
		backgroundImage: {
			type: String,
			default: 'url(../../../static/no_image.jpg)',
		},
	},
	setup(props) {
		// storeを取得する
		const store = useStore();
		const userInfo = computed(() => store.state.user);
		// CSS
		const styles = computed(() => {
			return {
				'--width': `${props.width}`,
				'--height': `${props.height}`,
				'--background-image': `${props.backgroundImage}`,
			};
		});
		return {
			userInfo,
			styles,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.user-icon {
	width: var(--width);
	height: var(--height);
	border-radius: 50%;
	background-size: contain;
}

/* ユーザーアイコンが設定されている場合 */
.user-image {
	background-image: var(--background-image);
}

/* ユーザーアイコン未設定状態 */
.no-image {
	background-image: url('../../../static/no_image.jpg');
}
</style>
