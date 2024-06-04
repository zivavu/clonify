<script setup lang="ts">
import type { Track as TrackType } from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';
import Track from '~/components/Track.vue';

const props = defineProps<{ tracks: TrackType[] }>();
</script>

<template>
	<div v-if="tracks?.length" class="w-full mb-4 min-w-fit">
		<h2 class="text-2xl font-bold">Tracks</h2>
		<ul>
			<li v-for="(track, index) in tracks" :key="index">
				<Track :track="track" />
			</li>
		</ul>
	</div>
</template>
