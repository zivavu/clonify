<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const artists = computed(() =>
	searchStore.results?.artists?.items.slice(0, 10)
);
</script>

<template>
	<div v-if="artists?.length" class="p-4 overflow-x-auto">
		<h2 class="text-2xl font-bold">Artists</h2>
		<div class="flex flex-row gap-4">
			<NuxtLink
				v-for="(artist, index) in artists"
				:key="index"
				:to="{
					name: 'artist-uri',
					params: { uri: encodeURIComponent(artist.uri) },
				}"
				class="flex flex-col items-center content-center p-4 space-y-4 rounded-lg hover:bg-neutral-900">
				<img
					:src="artist.images[0]?.url"
					width="192"
					height="192"
					alt="Artist Image"
					class="block object-cover rounded-full min-w-48 aspect-square" />
				<p>{{ artist.name }}</p>
			</NuxtLink>
		</div>
	</div>
</template>
