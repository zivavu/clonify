<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const albums = computed(() => searchStore.results?.albums?.items.slice(0, 10));
</script>

<template>
	<div v-if="albums?.length" class="p-4 mb-4 overflow-x-auto">
		<h2 class="text-2xl font-bold">Albums</h2>
		<div class="flex flex-row gap-4">
			<NuxtLink
				v-for="(album, index) in albums"
				:key="index"
				:to="{
					name: 'album-uri',
					params: { uri: encodeURIComponent(album.uri) },
				}"
				class="flex flex-col items-center content-center p-4 space-y-2 rounded-lg hover:bg-neutral-900">
				<img
					:src="album.images[0]?.url"
					width="192"
					height="192"
					alt="Album Cover"
					class="block object-cover h-48 rounded-lg min-w-48 aspect-square" />
				<p class="w-full text-lg font-semibold text-center truncate">
					{{ album.name }}
				</p>
				<p class="text-sm text-center text-gray-500">
					{{ new Date(album.release_date).getFullYear() }}
				</p>
			</NuxtLink>
		</div>
	</div>
</template>
