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
	<div>
		<h1>Search Results</h1>
		<TopResult v-if="results" />
		<Tracks v-if="results" />
		<Artists v-if="results" />
		<Albums v-if="results" />
		<Playlists v-if="results" />
		<!-- Dodaj inne komponenty dla Podcastów, Odcinków, Profilów i Gatunków -->

		<div v-else>No results found.</div>
	</div>
</template>
