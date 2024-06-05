<script setup lang="ts">
import { type Artist, type TopTracksResult } from '@spotify/web-api-ts-sdk';
import { onMounted, ref } from 'vue';

//@ts-ignore
import ColorThief from 'colorthief';
import Track from '~/components/Track.vue';

const route = useRoute();
const artistId = route.params.id as string;

// Fetch data for artist profile and top tracks
const { data: profile } = await useFetch<Artist>(
	`/api/artist/profile/${artistId}`
);
const { data: topTracks } = await useFetch<TopTracksResult>(
	`/api/artist/top-tracks/${artistId}`
);
const averageColor = ref<string | null>(null);

// Calculate the average color of the artist's image
onMounted(async () => {
	if (profile.value?.images?.length) {
		const image = new Image();
		image.crossOrigin = 'Anonymous'; // Set CORS attribute
		image.src = profile.value.images[0].url;

		// Wait for the image to load
		image.onload = () => {
			const colorThief = new ColorThief();
			const color = colorThief.getColor(image);
			averageColor.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
			console.log(averageColor.value);
		};
	}
});
</script>

<template>
	<div v-if="profile">
		<header
			:style="{ backgroundColor: averageColor || 'transparent' }"
			class="flex items-end justify-between p-8 bg-gradient-to-l from-primary via-primary-foreground to-primary-foreground">
			<div class="flex flex-row items-end gap-4">
				<img
					:src="(profile?.images?.length && profile.images[0]?.url) || ''"
					alt="Artist Image"
					class="w-32 h-32 rounded-full" />
				<div class="flex flex-col gap-6">
					<h1 class="text-5xl font-bold">{{ profile.name }}</h1>
					<p>{{ profile.followers.total }} Followers</p>
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
