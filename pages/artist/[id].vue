<script setup lang="ts">
import { type Artist, type TopTracksResult } from '@spotify/web-api-ts-sdk';
import { onMounted, ref } from 'vue';

import ColorThief from 'colorthief';
import Track from '~/components/Track.vue';

const route = useRoute();
const artistId = route.params.id as string;

const { data: profile } = await useFetch<Artist>(
	`/api/artist/profile/${artistId}`
);
const { data: topTracks } = await useFetch<TopTracksResult>(
	`/api/artist/top-tracks/${artistId}`
);
const averageColor = ref<string | null>(null);
const colorsGradient = ref<string>();

onMounted(async () => {
	if (profile.value?.images?.length) {
		const image = new Image();
		image.crossOrigin = 'Anonymous';
		image.src = profile.value.images[0].url;

		image.onload = () => {
			const colorThief = new ColorThief();
			//example return
			const colors = colorThief.getColor(image);

			averageColor.value = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;

			colorsGradient.value = `linear-gradient(0deg, rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 0.6) 0%, rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 1) 100%)`;
		};
	}
});
</script>

<template>
	<div v-if="profile">
		<header class="relative flex items-end justify-between p-8">
			<div class="absolute inset-0 header-gradient -z-10 brightness-75"></div>
			<div class="flex flex-row items-end gap-4">
				<img
					:src="(profile?.images?.length && profile.images[1]?.url) || ''"
					alt="Artist Image"
					class="rounded-full shadow-2xl w-60 h-60" />
				<div class="flex flex-col gap-6">
					<h1 class="text-5xl font-bold">{{ profile.name }}</h1>
					<p>
						{{
							profile.followers.total
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}}
						Followers
					</p>
				</div>
			</div>
			<div>
				<button class="btn btn-play">Play</button>
				<Button variant="ghost" class="btn btn-follow">Follow</Button>
				<button class="btn btn-playlist">Add to Playlist</button>
			</div>
		</header>
	</div>
	<div>
		<h2 class="text-2xl font-semibold">Top Tracks</h2>
		<ul>
			<li v-for="track in topTracks?.tracks" :key="track.id" class="py-2">
				<Track :track="track" :context-uri="profile?.uri" />
			</li>
		</ul>
	</div>
</template>

<style scoped>
.header-gradient {
	background-image: v-bind(colorsGradient);
}
</style>
