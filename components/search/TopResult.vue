<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const topResult = computed(() => searchStore.results?.tracks?.items?.[0]);
</script>

<template>
	<div v-if="topResult" class="relative p-4 top-result">
		<h2 class="text-xl font-bold">Top Result</h2>
		<NuxtLink
			:to="{
				name: 'track-uri',
				params: { uri: encodeURIComponent(topResult.uri) },
			}"
			class="relative flex flex-col gap-6 p-4 rounded-lg min-w-96 hover:bg-neutral-900 bg-neutral-950">
			<nuxt-img
				:src="topResult.album.images[0]?.url"
				alt="Cover Art"
				class="w-24 h-24 rounded" />
			<div class="mb-4">
				<h3 class="text-3xl font-semibold">{{ topResult.name }}</h3>
				<p>{{ topResult.artists[0].name }}</p>
			</div>
			<button class="absolute z-10 bottom-4 right-4">
				<Icon
					icon="ic:round-play-circle"
					class="text-6xl text-green-500 transition duration-100 hover:scale-105" />
			</button>
		</NuxtLink>
	</div>
</template>
