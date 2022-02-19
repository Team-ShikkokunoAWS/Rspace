<template>
	<div class="btn" :style="styles">
		<button>{{ props.name }}</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'CButton',
	props: {
		// ボタンの中のテキスト名
		name: {
			type: String,
			required: true,
		},
		// ボタンの色（特定の文字列で色を与えて利用する）
		colorType: {
			type: String,
			required: true,
			default: 'teal',
			validator: (value: string) => {
				return ['primary', 'teal'].includes(value);
			},
		},
		// ボタンの幅(デフォルト値：300px)
		width: {
			type: String,
			default: '300px',
		},
	},
	setup(props) {
		const styles = computed(() => {
			return {
				'--color':
					props.colorType === 'teal'
						? 'rgb(91, 155, 155)'
						: props.colorType === 'primary'
						? 'rgb(103, 129, 212)'
						: 'rgb(91, 155, 155)', // どれでもなければteal
				'--width': `calc(${props.width})`,
			};
		});
		return {
			props,
			styles,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.btn {
	margin-top: 5px;
}
.btn button {
	padding: 8px;
	background: var(--color);
	color: #eee;
	font-size: 18px;
	font-weight: bold;
	border-radius: 8px;
	width: var(--width);
}
.btn button:hover {
	cursor: pointer;
	opacity: 0.8;
}
.btn button:active {
	width: var(calc(--width - 1%));
}
</style>
