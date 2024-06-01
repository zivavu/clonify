<script setup lang="ts">
import { computed } from 'vue';
import ResourceLink from '~/components/ResourceLink.vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const albums = computed(() => searchStore.results?.albums?.items.slice(0, 10));
</script>

<template>
	<div v-if="albums?.length" class="p-4 mb-4 albums">
		<h2 class="text-lg font-bold">Albums</h2>
		<div class="grid grid-cols-2 gap-4">
			<div
				v-for="(album, index) in albums"
				:key="index"
				class="flex items-center p-2 space-x-4 rounded">
				<ResourceLink
					:to="{
						name: 'album-uri',
						params: { uri: encodeURIComponent(album.uri) },
					}">
					<img :src="album.images[0]?.url" alt="" class="w-12 h-12 rounded" />
					<p>{{ album.name }}</p>
				</ResourceLink>
			</div>
		</div>
	</div>
</template>
