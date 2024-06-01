<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const topResult = computed(() => searchStore.results?.topResults?.items?.[0]);
</script>

<template>
	<div v-if="topResult" class="p-4 mb-4 border rounded shadow top-result">
		<h2 class="text-lg font-bold">Top Result</h2>
		<NuxtLink
			:to="{
				name: 'track-uri',
				params: { uri: encodeURIComponent(topResult.data.uri) },
			}"
			class="flex items-center p-2 space-x-4 rounded cursor-pointer hover:bg-gray-100">
			<img
				:src="topResult.data.albumOfTrack.coverArt.sources[0].url"
				alt=""
				class="w-16 h-16 rounded" />
			<div>
				<h3 class="text-xl font-semibold">{{ topResult.data.name }}</h3>
				<p>{{ topResult.data.artists.items[0].profile.name }}</p>
			</div>
		</NuxtLink>
	</div>
</template>

<style scoped>
.hover\:bg-gray-100:hover {
	background-color: #f7fafc;
}
.cursor-pointer {
	cursor: pointer;
}
.p-2 {
	padding: 0.5rem;
}
.rounded {
	border-radius: 0.375rem;
}
</style>
