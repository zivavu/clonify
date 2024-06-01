<script setup lang="ts">
import { computed } from 'vue';
import Track from '~/components/Track.vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const tracks = computed(() => searchStore.results?.tracks?.items.slice(1, 5));
</script>

<template>
	<div v-if="tracks?.length" class="w-full p-4 mb-4 min-w-fit">
		<h2 class="text-lg font-bold">Tracks</h2>
		<ul>
			<li v-for="(track, index) in tracks" :key="index">
				<Track :track="track" />
			</li>
		</ul>
	</div>
</template>
