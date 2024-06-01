<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Track } from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';

const props = defineProps<{
	track: Track;
}>();
</script>

<template>
	<div class="flex items-center justify-between p-2">
		<NuxtLink
			:to="{
				name: 'track-uri',
				params: { uri: encodeURIComponent(track.uri) },
			}"
			class="flex items-center p-2 space-x-4 rounded hover:bg-neutral-800">
			<img
				:src="track.album.images[0]?.url"
				alt="Cover Art"
				class="w-8 h-8 rounded" />
			<div>
				<h3 class="text-xl font-semibold">{{ track.name }}</h3>
				<p>{{ track.artists[0]?.name }}</p>
			</div>
		</NuxtLink>
		<div class="flex items-center space-x-2">
			<p>
				{{ (track.duration_ms / 1000 / 60).toFixed(2) }}
			</p>
			<button
				class="p-2 rounded bg-neutral-800 text-neutral-100 hover:bg-neutral-700">
				<Icon icon="ci:plus" />
			</button>
		</div>
	</div>
</template>
