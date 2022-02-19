<template>
	<div class="container" :style="styles">
		<div class="group">
			<span v-if="props.required === 'true'" style="color: red">*</span>
			<input
				:id="props.ctlName"
				:maxlength="props.maxlength"
				:type="props.type"
				:value="modelValue"
				@input="$emit('update:modelValue', $event.target.value)"
			/>
			<span class="highlight"></span>
			<label>{{ props.labelName }}</label>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';

export default defineComponent({
	name: 'InputForm',
	props: {
		// 親との連携データ 親側ではv-model=""で指定される値
		modelValue: {
			type: String,
			default: '',
		},
		// フォームIDになるので各ページ単位で一意の命名をすること
		ctlName: {
			type: String,
			required: true,
		},
		// このフォームのラベル名を設定
		labelName: {
			type: String,
			required: true,
		},
		// 呼び出し元でrequired="true"で必須アスタリスク表示
		required: {
			type: String,
			validator: (value: string) => {
				return ['true'].includes(value);
			},
		},
		// inputのtypeオプション text, password, searchのみ許容
		type: {
			type: String,
			required: true,
			validator: (value: string) => {
				return ['text', 'password', 'search'].includes(value);
			},
		},
		// このフォームに入力できる最大文字数を設定する
		maxlength: {
			type: String,
		},
		// このフォームにフォーカスを当てるかどうかの判定
		focus: {
			type: String,
			validator: (value: string) => {
				return ['true'].includes(value);
			},
		},
		// このフォームの幅を決定する（props指定がない場合は300pxになる）
		width: {
			type: String,
			default: '300px',
		},
	},
	setup(props) {
		const styles = computed(() => {
			return {
				'--formWidth': `${props.width}`,
			};
		});
		// 呼び出し元でfocus="true"を設定している場合、表示時にフォーカスを当てる
		onMounted(() => {
			if (props.focus) {
				const form = document.getElementById(props.ctlName);
				form?.focus();
			}
		});

		return {
			props,
			styles,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.container {
	font-family: 'Roboto';
	width: var(--formWidth);
	display: inline-block;
}
.group {
	position: relative;
	margin-bottom: 45px;
	display: flex;
	z-index: 1;
}
input {
	font-size: 18px;
	padding: 10px 10px 10px 5px;
	display: inline-block;
	width: var(--formWidth);
	border: none;
	border-bottom: 1px solid #757575;
	background-color: none;
}
input:focus {
	outline: none;
	border-bottom: 2px solid #5264ae;
	background-color: none;
}

/* LABEL ======================================= */
label {
	color: #999;
	font-size: 18px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 5px;
	top: 10px;
	transition: 0.2s ease all;
	-moz-transition: 0.2s ease all;
	-webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
	top: -20px;
	font-size: 14px;
	color: #5264ae;
}

/* HIGHLIGHTER ================================== */
.highlight {
	position: absolute;
	height: 60%;
	width: 100px;
	top: 25%;
	left: 0;
	pointer-events: none;
	opacity: 0.5;
}

/* active state */
input:focus ~ .highlight {
	-webkit-animation: inputHighlighter 0.3s ease;
	-moz-animation: inputHighlighter 0.3s ease;
	animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from {
		background: #5264ae;
	}
	to {
		width: 0;
		background: transparent;
	}
}
@-moz-keyframes inputHighlighter {
	from {
		background: #5264ae;
	}
	to {
		width: 0;
		background: transparent;
	}
}
@keyframes inputHighlighter {
	from {
		background: #5264ae;
	}
	to {
		width: 0;
		background: transparent;
	}
}
</style>
