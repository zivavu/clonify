<script setup lang="ts">
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { computed } from 'vue';
import Albums from '~/components/Albums.vue';
import Artists from '~/components/Artists.vue';
import Playlists from '~/components/Playlists.vue';
import TopResult from '~/components/TopResult.vue';
import Tracks from '~/components/Tracks.vue';
import { useDiscoverStore } from '~/stores/discoverStore';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const discoverStore = useDiscoverStore();
const results = computed(() => searchStore.results);
const categories = computed(() => discoverStore.categories);

const isSearchData = computed(() => {
	return (
		results.value?.tracks?.items?.length ||
		results.value?.artists?.items?.length ||
		results.value?.albums?.items?.length ||
		results.value?.playlists?.items?.length
	);
});

searchStore.clearResults();
await discoverStore.fetchCategories();
</script>

<template>
	<div class="flex flex-wrap gap-2 space">
		<div v-show="isSearchData" class="w-full">
			<div class="flex flex-row flex-wrap w-full xl:flex-nowrap">
				<TopResult
					v-if="results?.tracks?.items?.length"
					:top-result="results?.tracks?.items[0]" />
				<Tracks
					v-if="results?.tracks?.items"
					:tracks="results?.tracks?.items?.slice(1, 5)" />
			</div>
			<Artists
				v-if="results?.artists?.items"
				:artists="results?.artists?.items"
				class="min-w-full" />
			<Albums
				v-if="results?.albums?.items"
				:albums="results?.albums?.items"
				class="min-w-full" />
			<Playlists
				v-if="results?.playlists"
				:playlists="results?.playlists?.items as SimplifiedPlaylist[]"
				class="min-w-full" />
		</div>
		<div v-show="!isSearchData" class="w-full p-4">
			<h2 class="mb-4 text-2xl font-bold">Discover</h2>
			<div
				class="grid gap-4"
				style="grid-template-columns: repeat(auto-fill, minmax(170px, 1fr))">
				<div
					v-for="category in categories"
					:key="category.id"
					class="relative flex flex-col items-center">
					<img
						:src="category.icons[0].url"
						class="w-full rounded-lg aspect-square"
						alt="Category Icon" />
					<p class="absolute text-xl font-bold text-center text-white bottom-2">
						{{ category.name }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
