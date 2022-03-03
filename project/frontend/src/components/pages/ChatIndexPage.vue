<template>
	<MainCard
		width="800px"
		height="120px"
		class="chat-room-card"
		v-for="item in items"
		:key="item.uid"
	>
		<div class="chatIndex-user-wrapper">
			<div class="user-icon">
				<img
					class="user-icon-img"
					:src="require(`@/assets/${item.iconImage}`)"
				/>
			</div>
		</div>
		<div class="message-wrapper">
			<div class="message-bar">
				{{ item.message }}
			</div>
			<div class="message-time">{{ item.timestamp }}</div>
		</div>
	</MainCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainCard from '@/components/parts/MainCard.vue';

export default defineComponent({
	name: 'ChatIndexPage',
	components: {
		MainCard,
	},
	setup() {
		// 描写用モックデータ
		const items = [
			{
				iconImage: 'img.jpg',
				uid: 'test-test-test-test-1',
				name: 'John',
				message: 'hello good night!!',
				timestamp: '2022-03-03 21:54',
			},
			{
				iconImage: 'img.jpg',
				uid: 'test-test-test-test-2',
				name: 'Mary',
				message: 'lets talk with me??',
				timestamp: '2022-03-02 20:32',
			},
			{
				iconImage: 'img.jpg',
				uid: 'test-test-test-test-3',
				name: 'Mickel',
				message:
					'lorem ipsum dolor sit am lorem ipsum dolor sit am lorem ipsum dolor sit',
				timestamp: '2022-03-01 18:44',
			},
		];

		return {
			items,
		};
	},
}); // export default defineComponent
</script>

<style scoped>
.chat-room-card {
	padding: 12px;
	display: flex;
	position: relative;
}

.user-icon {
	width: 80px;
	height: 80px;
}

.user-icon-img {
	position: absolute;
	top: 24px;
	left: 32px;
	width: 80px;
	height: 80px;
	border-radius: 50%;
}

.message-wrapper {
	padding: 12px;
	border-radius: 8px;
	font-size: 16px;
	background-color: #fff;
	height: 80px;
	position: absolute;
	left: 180px;
	top: 24px;
}

.message-bar {
	width: 560px;
	height: 40px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.message-time {
	position: absolute;
	bottom: 10px;
	right: 12px;
}
</style>
