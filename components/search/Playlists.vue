<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const playlists = computed(() =>
	searchStore.results?.playlists?.items.slice(0, 10)
);
</script>

<template>
	<h2 class="ml-4 text-2xl font-bold">Playlists</h2>
	<div v-if="playlists?.length" class="p-2 mb-4 overflow-x-auto">
		<div class="flex flex-row gap-4">
			<NuxtLink
				v-for="(playlist, index) in playlists"
				:key="index"
				:to="{
					name: 'playlist-uri',
					params: { uri: encodeURIComponent(playlist.uri) },
				}"
				class="flex flex-col items-center content-center p-4 space-y-2 rounded-lg hover:bg-neutral-900">
				<img
					:src="playlist.images[0]?.url"
					width="192"
					height="192"
					alt="Playlist Cover"
					class="block object-cover h-48 rounded-lg min-w-48 aspect-square" />
				<p class="w-full text-lg font-semibold text-center truncate">
					{{ playlist.name }}
				</p>
			</NuxtLink>
		</div>
	</div>
</template>
