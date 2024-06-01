<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { defineProps } from 'vue';
import type { PartialTrackInfo } from '~/types/search';

const props = defineProps<{
	track: PartialTrackInfo;
}>();
</script>

<template>
	<div class="flex items-center justify-between p-2">
		<NuxtLink
			:to="{
				name: 'track-uri',
				params: { uri: encodeURIComponent(track.data.uri) },
			}"
			class="flex items-center p-2 space-x-4 rounded hover:bg-neutral-800">
			<img
				:src="track.data.albumOfTrack.coverArt.sources[0].url"
				alt="Cover Art"
				class="w-8 h-8 rounded" />
			<div>
				<h3 class="text-xl font-semibold">{{ track.data.name }}</h3>
				<p>{{ track.data.artists.items[0].profile.name }}</p>
			</div>
		</NuxtLink>
		<div class="flex items-center space-x-2">
			<p>
				{{ (track.data.duration.totalMilliseconds / 1000 / 60).toFixed(2) }}
			</p>
			<button
				class="p-2 rounded bg-neutral-800 text-neutral-100 hover:bg-neutral-700">
				<Icon icon="ci:plus" />
			</button>
		</div>
	</div>
</template>
