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
	<div v-if="tracks?.length" class="w-full space-y-4">
		<h2 class="text-2xl font-bold">{{ title || 'Tracks' }}</h2>
		<ul>
			<li v-for="(track, index) in tracks" :key="index">
				<Track :track="track" :contextUri="props.contextUri" />
			</li>
		</ul>
	</div>
</template>
