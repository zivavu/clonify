<script setup lang="ts">
import { computed } from 'vue';
import ResourceLink from '~/components/ResourceLink.vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const tracks = computed(() => searchStore.results?.tracks?.items.slice(0, 4));
</script>

<template>
	<div v-if="tracks?.length" class="p-4 mb-4 border rounded shadow tracks">
		<h2 class="text-lg font-bold">Tracks</h2>
		<ul>
			<li v-for="(track, index) in tracks" :key="index" class="p-2 border-b">
				<ResourceLink
					:to="{
						name: 'track-uri',
						params: { uri: encodeURIComponent(track.data.uri) },
					}">
					{{ track.data.name }} - {{ track.data.artists.items[0].profile.name }}
				</ResourceLink>
			</li>
		</ul>
	</div>
</template>
