<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const topResult = computed(() => searchStore.results?.topResults?.items?.[0]);
</script>

<template>
	<div v-if="topResult" class="p-4 mb-4 top-result">
		<h2 class="text-lg font-bold">Top Result</h2>
		<NuxtLink
			:to="{
				name: 'track-uri',
				params: { uri: encodeURIComponent(topResult.data.uri) },
			}"
			class="flex items-center p-2 space-x-4 rounded hover:bg-neutral-800">
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
