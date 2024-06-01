<script setup lang="ts">
import { computed } from 'vue';
import ResourceLink from '~/components/ResourceLink.vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const playlists = computed(() =>
	searchStore.results?.playlists?.items.slice(0, 10)
);
</script>

<template>
	<div v-if="playlists?.length" class="p-4 mb-4 playlists">
		<h2 class="text-lg font-bold">Playlists</h2>
		<div class="grid grid-cols-2 gap-4">
			<div
				v-for="(playlist, index) in playlists"
				:key="index"
				class="flex items-center p-2 space-x-4 rounded">
				<ResourceLink
					:to="{
						name: 'playlist-uri',
						params: { uri: encodeURIComponent(playlist.uri) },
					}">
					<img
						:src="playlist.images[0]?.url"
						alt=""
						class="w-12 h-12 rounded" />
					<p>{{ playlist.name }}</p>
				</ResourceLink>
			</div>
		</div>
	</div>
</template>
