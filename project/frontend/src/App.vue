<template>
	<div>
		<!-- 状態管理による表示・非表示 -->
		<ToastMessage />
		<Loader />
		<Dialog />
		<SideBar />
		<BackImageModal />
		<IconImageModal />
		<!-- 画面表示領域 -->
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
import SideBar from '@/components/globals/SideBar.vue';
import BackImageModal from '@/components/globals/BackImageModal.vue';
import IconImageModal from '@/components/globals/IconImageModal.vue';

export default defineComponent({
	name: 'App',
	components: {
		Header,
		ToastMessage,
		Dialog,
		Loader,
		SideBar,
		BackImageModal,
		IconImageModal,
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
