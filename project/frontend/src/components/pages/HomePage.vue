<template>
	<div class="home-title">
		<h2>Home</h2>
	</div>

	<MainCard color="#fff" height="60vh" width="900px"> 
		
	</MainCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainCard from '@/components/parts/MainCard.vue';

export default defineComponent({
	name: 'HomePage',
	components: {
		MainCard,
	},
	setup() {
		return {};
	},
}); // export default defineComponent
</script>

<style scoped>
.home-title {
	text-align: center;
}
</style>
