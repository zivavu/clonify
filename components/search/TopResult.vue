<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const playerStore = usePlayerStore();
const topResult = computed(() => searchStore.results?.topResults?.items?.[0]);

const playTopResult = () => {
	if (topResult.value) {
		playerStore.playTrack(topResult.value);
	}
};
</script>

<template>
	<div v-if="topResult" class="relative p-4 top-result">
		<h2 class="mb-4 text-xl font-bold">Top Result</h2>
		<NuxtLink
			:to="{
				name: 'track-uri',
				params: { uri: encodeURIComponent(topResult.data.uri) },
			}"
			class="relative flex flex-col gap-6 p-4 rounded-lg min-w-96 hover:bg-neutral-800 bg-neutral-950">
			<img
				:src="topResult.data.albumOfTrack.coverArt.sources[0].url"
				alt="Cover Art"
				class="w-24 h-24 rounded" />
			<div class="mb-4">
				<h3 class="text-3xl font-semibold">{{ topResult.data.name }}</h3>
				<p>{{ topResult.data.artists.items[0].profile.name }}</p>
			</div>
			<button
				@click.stop.prevent="playTopResult"
				class="absolute z-10 bottom-4 right-4">
				<Icon
					icon="ic:round-play-circle"
					class="text-6xl text-green-500 transition duration-100 hover:scale-105" />
			</button>
		</NuxtLink>
	</div>
</template>
