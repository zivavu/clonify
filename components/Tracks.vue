<script setup lang="ts">
import type { Track as TrackType } from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';
import Track from '~/components/Track.vue';

const props = defineProps<{
	tracks: TrackType[];
	title: string;
	contextUri?: string;
}>();
</script>

<template>
	<div v-if="tracks?.length" class="w-full">
		<h2 class="mb-4 text-2xl font-bold">{{ title || '' }}</h2>

		<Track
			v-for="(track, index) in tracks"
			:key="index"
			:track="track"
			:contextUri="props.contextUri" />
	</div>
</template>
