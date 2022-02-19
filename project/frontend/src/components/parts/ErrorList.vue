<template>
	<div>
		<ul>
			<li
				class="error-message"
				v-for="errorMessage in props.errorMessages"
				:key="errorMessage"
			>
				{{ errorMessage }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface State {
	errorMessage: Array<String>;
}

export default defineComponent({
	name: 'ErrorList',
	props: {
		errorMessages: {
			type: Object as PropType<State>,
		},
	},
	setup(props) {
		return {
			props,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.error-message {
	list-style: none;
	color: red;
}
</style>
