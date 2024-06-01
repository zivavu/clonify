<script setup lang="ts">
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';
import ResourceLink from '~/components/ResourceLink.vue';

const searchStore = useSearchStore();
const albums = computed(() => searchStore.results?.albums?.items.slice(0, 10));
</script>

<template>
	<div v-if="albums?.length" class="p-4 mb-4 border rounded shadow albums">
		<h2 class="text-lg font-bold">Albums</h2>
		<div class="grid grid-cols-2 gap-4">
			<div
				v-for="(album, index) in albums"
				:key="index"
				class="flex items-center p-2 space-x-4 rounded">
				<ResourceLink
					:to="{
						name: 'album-uri',
						params: { uri: encodeURIComponent(album.data.uri) },
					}">
					<img
						:src="album.data.coverArt.sources[0].url"
						alt=""
						class="w-12 h-12 rounded" />
					<p>{{ album.data.name }}</p>
				</ResourceLink>
			</div>
		</div>
	</div>
</template>
