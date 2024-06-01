<script setup lang="ts">
import Albums from '~/components/search/Albums.vue';
import Artists from '~/components/search/Artists.vue';
import Playlists from '~/components/search/Playlists.vue';
import TopResult from '~/components/search/TopResult.vue';
import Tracks from '~/components/search/Tracks.vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const results = computed(() => searchStore.results);
</script>

<template>
	<div class="flex flex-wrap gap-2 space">
		<div class="flex flex-row flex-wrap w-full xl:flex-nowrap">
			<TopResult v-if="results" />
			<Tracks v-if="results" />
		</div>
		<Artists v-if="results" class="min-w-full" />
		<Albums v-if="results" class="min-w-full" />
		<Playlists v-if="results" class="min-w-full" />

		<div v-else>No results found.</div>
	</div>
</template>
