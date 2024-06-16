<script setup lang="ts">
import type { Album, Track as TrackType } from '@spotify/web-api-ts-sdk';
import { useRoute } from 'vue-router';
import ArtistLink from '~/components/Links/ArtistLink.vue';
import Track from '~/components/Track.vue';

const route = useRoute();
const albumId = route.params.id;

const { data: album } = await useFetch<Album>(`/api/album/${albumId}`);
</script>

<template>
	<div
		v-if="album"
		class="w-full h-full bg-gradient-to-br from-[#33384276] to-primary px-10 py-6">
		<div class="flex flex-col space-y-5">
			<div>
				<h2 class="text-3xl font-medium">
					{{ album?.name }}
				</h2>
			</div>

			<div class="flex flex-row items-center space-x-2">
				<ArtistLink :artist="album?.artists[0]" />
				<p class="text-muted-foreground">・</p>
				<p class="text-sm font-thin text-secondary-foreground">
					{{ new Date(album?.release_date).getFullYear() }}
				</p>
				<p class="text-muted-foreground">・</p>
				<p class="text-sm font-thin text-secondary-foreground">
					{{ album?.total_tracks }} tracks
				</p>
			</div>

			<div>
				<hr />
				<Track
					v-for="(track, index) in album.tracks.items"
					:key="index"
					:track="track as TrackType"
					:trackIndex="index + 1" />
			</div>
		</div>
	</div>
</template>
