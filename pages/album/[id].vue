<script setup lang="ts">
import type { Album, Track as TrackType } from '@spotify/web-api-ts-sdk';
import { useRoute } from 'vue-router';
import ArtistLink from '~/components/Links/ArtistLink.vue';
import Track from '~/components/Track.vue';

const route = useRoute();
const albumId = route.params.id;

const { data: album } = await useFetch<Album>(`/api/album/${albumId}`);
const albumTracksDurations = album?.value?.tracks.items.map(
	(track) => track.duration_ms
);

const albumDuration = albumTracksDurations?.reduce((a, b) => a + b, 0);
</script>

<template>
	<div
		v-if="album"
		class="w-full relative min-h-full flex flex-col space-y-6 bg-gradient-to-br from-[#33384276] to-primary px-12 py-6">
		<div class="flex flex-row items-end space-x-6">
			<img
				:src="album?.images[0]?.url"
				alt="Album Art"
				class="rounded-xl min-w-60 max-w-60 aspect-square" />

			<div class="space-y-6">
				<h2 class="font-bold text-8xl">
					{{ album?.name }}
				</h2>

				<div class="flex flex-row items-center space-x-2">
					<ArtistLink :artist="album?.artists[0]" />
					<p class="text-muted-foreground">・</p>
					<p class="text-sm font-light">
						{{ new Date(album?.release_date).getFullYear() }}
					</p>
					<p class="text-muted-foreground">・</p>
					<p class="text-sm font-light">{{ album?.total_tracks }} tracks</p>
					<p class="text-muted-foreground">・</p>
					<p v-if="albumDuration" class="text-sm font-light">
						{{ formatTime(albumDuration, true) }}
					</p>
				</div>
			</div>
		</div>

		<div>
			<hr class="mb-2" />
			<Track
				v-for="(track, index) in album.tracks.items"
				:key="index"
				:track="track as TrackType"
				:trackIndex="index + 1" />
		</div>
	</div>
</template>
