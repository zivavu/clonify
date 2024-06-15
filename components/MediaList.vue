<script setup lang="ts">
import type {
	SimplifiedAlbum,
	SimplifiedPlaylist,
} from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';

type MediaItem = SimplifiedAlbum | SimplifiedPlaylist;

const props = defineProps<{
	items: MediaItem[];
	title?: string;
	multipleRows?: boolean;
}>();
</script>

<template>
	<div class="w-full space-y-2">
		<h2 v-if="title" class="text-2xl font-bold">{{ title }}</h2>

		<div v-if="items?.length" class="p-2">
			<div
				class="grid-container"
				:style="`grid-auto-rows: ${multipleRows ? 'auto' : '0'}`">
				<div
					v-for="(item, index) in items"
					:key="index"
					style="overflow-y: hidden">
					<NuxtLink
						:to="{
							name: item.type === 'album' ? 'album-id' : 'playlist-id',
							params: { id: encodeURIComponent(item.id) },
						}"
						class="flex flex-col content-center p-4 space-y-2 rounded-lg hover:bg-neutral-900">
						<img
							:src="item.images[1]?.url || item.images[0].url"
							width="192"
							height="192"
							alt="Media Cover"
							class="block object-cover w-full h-full rounded aspect-square" />
						<p class="w-full truncate">
							{{ item.name }}
						</p>
						<p
							v-if="item.type === 'album' && 'release_date' in item"
							class="text-sm text-gray-400">
							{{ new Date(item.release_date).getFullYear() }}
						</p>
						<p v-if="item.type === 'playlist'" class="text-sm text-gray-400">
							By: {{ (item as SimplifiedPlaylist).owner.display_name }}
						</p>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.grid-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	grid-template-rows: 1fr;
}
</style>
