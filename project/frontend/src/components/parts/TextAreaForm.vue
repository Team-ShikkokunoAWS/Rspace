<template>
	<div class="textarea-wrapper">
		<textarea
			:id="props.ctlName"
			:maxlength="props.maxlength"
			:style="styles"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			@keydown.enter.meta="handleKeyDownEnter"
		></textarea>
		<span class="highlight"></span>
		<fa-icon class="send-btn" icon="paper-plane" @click="handleSubmit" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';

export default defineComponent({
	name: 'TextAreaForm',
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
		width: {
			type: String,
			default: '300px',
		},
		height: {
			type: String,
			default: '100px',
		},
		maxlength: {
			type: Number,
			default: 100,
		},
		// このフォームにフォーカスを当てるかどうかの判定
		focus: {
			type: String,
			validator: (value: string) => {
				return ['true'].includes(value);
			},
		},
	},
	setup(props, context) {
		// 呼び出し元でのsyleの設定を適用する
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

		// 送信ボタン押下時の処理(親にイベントを通知する)
		const handleSubmit = () => {
			context.emit('onclickSubmit');
		};

		// EnterKeyのみ押下した際のイベント
		const handleKeyDownEnter = (e: KeyboardEvent) => {
			// ctlKeyもしくはcommandKeyとEnterKeyを同時に押した場合、送信する
			if (e.ctrlKey || e.metaKey) {
				context.emit('onclickSubmit');
			}
		};

		return {
			props,
			styles,
			handleKeyDownEnter,
			handleSubmit,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.textarea-wrapper {
	position: relative;
}

/*---------------------
  入力部分
----------------------*/
textarea {
	resize: none; /** ユーザーのtextareaサイズ変更を無効化 */
	/* テキストエリアの横幅 ＝ 100% - 送信ボタンの横幅40px - テキストエリアの左の余白10px - 送信ボタン右側の余白24px - 送信ボタンとテキストエリアの間の余白30px */
	width: calc(100% - 40px - 10px - 24px - 30px);
	height: 60px;
	font-size: 20px;
	border: none;
	border-bottom: 1px solid #347aeb;
	background-color: inherit;
	/* 複数行入力した際のスクロールバーを非表示する */
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	/* color: #eee; * テキストエリア入力フォームの文字色を白にする */
	color: #333;
}
textarea::-webkit-scrollbar {
	/* Chrome, Safari 対応 */
	display: none;
}
textarea:focus {
	outline: none;
}

/* HIGHLIGHTER ================================== */
.highlight {
	position: absolute;
	height: 60%;
	width: calc(100% - 40px - 10px - 24px - 30px);
	top: 25%;
	left: 10px;
	pointer-events: none;
	opacity: 0.5;
}

/* active state */
textarea:focus ~ .highlight {
	-webkit-animation: inputHighlighter 0.3s ease;
	-moz-animation: inputHighlighter 0.3s ease;
	animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from {
		background: #6076cc;
	}
	to {
		width: 0;
		background: transparent;
	}
}
@-moz-keyframes inputHighlighter {
	from {
		background: #6076cc;
	}
	to {
		width: 0;
		background: transparent;
	}
}
@keyframes inputHighlighter {
	from {
		background: #6076cc;
	}
	to {
		width: 0;
		background: transparent;
	}
}
/*---------------------
	送信ボタン部分
 ----------------------*/
.send-btn {
	font-size: 36px;
	font-weight: bold;
	position: absolute;
	bottom: 8px;
	right: 28px;
	transform: rotate(45deg);
	color: #04ccc2;
	width: 40px;
	height: 40px;
}
.send-btn:hover {
	opacity: 0.6;
	cursor: pointer;
}
</style>
