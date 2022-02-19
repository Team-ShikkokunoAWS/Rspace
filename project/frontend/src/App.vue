<template>
	<div>
		<ToastMessage />
		<Loader />
		<Dialog />
		<Header />
		<router-view />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/globals/Header.vue';
import ToastMessage from '@/components/globals/ToastMessage.vue';
import Dialog from '@/components/globals/Dialog.vue';
import Loader from '@/components/globals/Loader.vue';

export default defineComponent({
	name: 'App',
	components: {
		Header,
		ToastMessage,
		Dialog,
		Loader,
	},
	setup() {
		return {};
	},
});
</script>

<style>
body {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	height: 100vh;
}
</style>
