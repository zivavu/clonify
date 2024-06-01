<script setup lang="ts">
import { computed } from 'vue';
import ResourceLink from '~/components/ResourceLink.vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const artists = computed(() =>
	searchStore.results?.artists?.items.slice(0, 10)
);
console.log(artists);
</script>

<template>
	<div v-if="artists?.length" class="p-4 mb-4 artists">
		<h2 class="text-lg font-bold">Artists</h2>
		<div class="grid grid-cols-2 gap-4">
			<div
				v-for="(artist, index) in artists"
				:key="index"
				class="flex items-center p-2 space-x-4 rounded">
				<ResourceLink
					:to="{
						name: 'artist-uri',
						params: { uri: encodeURIComponent(artist.uri) },
					}">
					<img :src="artist.images[0]?.url" alt="" class="w-12 h-12 rounded" />
					<p>{{ artist.name }}</p>
				</ResourceLink>
			</div>
		</div>
	</div>
</template>
