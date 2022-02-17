<template>
	<div>
		<ToastMessage />
		<Header />
		<Dialog />
		<router-view />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';
import ToastMessage from '@/components/ToastMessage.vue';
import Dialog from '@/components/Dialog.vue';

@Options({
	components: {
		Header,
		ToastMessage,
		Dialog,
	},
})
export default class App extends Vue {}
</script>

<style>
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	height: 100vh;
}
</style>
