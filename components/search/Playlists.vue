<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';
import ResourceLink from '~/components/ResourceLink.vue';

const searchStore = useSearchStore();
const playlists = computed(() =>
	searchStore.results?.playlists?.items.slice(0, 10)
);
</script>

<template>
	<div
		v-if="playlists?.length"
		class="p-4 mb-4 border rounded shadow playlists">
		<h2 class="text-lg font-bold">Playlists</h2>
		<div class="grid grid-cols-2 gap-4">
			<div
				v-for="(playlist, index) in playlists"
				:key="index"
				class="flex items-center p-2 space-x-4 rounded">
				<ResourceLink
					:to="{
						name: 'playlist-uri',
						params: { uri: encodeURIComponent(playlist.data.uri) },
					}">
					<img
						:src="playlist.data.images.items[0].sources[0].url"
						alt=""
						class="w-12 h-12 rounded" />
					<p>{{ playlist.data.name }}</p>
				</ResourceLink>
			</div>
		</div>
	</div>
</template>
