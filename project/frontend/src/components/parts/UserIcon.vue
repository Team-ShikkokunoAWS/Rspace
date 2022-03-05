<template>
	<div v-show="userInfo.isLogined">
		<!-- ユーザーのアイコン画像が設定されている場合、設定画像パスでアイコンを表示 -->
		<div>
			<div class="user-icon user-image" :style="styles"></div>
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
			default: 'no_image.jpg',
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
				'--backgroundImage': props.backgroundImage
					? `url(${props.backgroundImage})` // 設定画像がある場合はそのパスを用いる
					: 'url(no_image.jpg)', // 設定画像がない場合はno_imageを表示
			};
		});
		return {
			userInfo,
			styles,
			props,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.user-icon {
	width: var(--width);
	height: var(--height);
	border-radius: 50%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	border: 1px solid #87cefa;
	background-color: #ddd;
}

.user-image {
	background-image: var(--backgroundImage);
}
</style>
