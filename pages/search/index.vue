<script setup lang="ts">
import Albums from '~/components/Albums.vue';
import Artists from '~/components/Artists.vue';
import Playlists from '~/components/Playlists.vue';
import TopResult from '~/components/TopResult.vue';
import Tracks from '~/components/Tracks.vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const results = computed(() => searchStore.results);
</script>

<template>
	<div class="flex flex-wrap gap-2 space">
		<div class="flex flex-row flex-wrap w-full xl:flex-nowrap">
			<TopResult
				v-if="results?.tracks?.items?.length"
				:top-result="results.tracks.items[0]" />
			<Tracks
				v-if="results?.tracks?.items"
				:tracks="results.tracks.items.slice(1, 5)" />
		</div>
		<Artists
			v-if="results?.artists?.items"
			:artists="results.artists.items"
			class="min-w-full" />
		<Albums
			v-if="results?.albums?.items"
			:albums="results.albums.items"
			class="min-w-full" />
		<Playlists
			v-if="results?.playlists"
			:playlistsSearchResult="results?.playlists"
			class="min-w-full" />
		<div v-else>No results found.</div>
	</div>
</template>
