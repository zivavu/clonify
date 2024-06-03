<script setup lang="ts">
import { type Artist, type TopTracksResult } from '@spotify/web-api-ts-sdk';
import ColorThief from 'colorthief';
import { onMounted, ref } from 'vue';

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
		};
	}
});
</script>

<template>
	<div
		v-if="profile"
		:style="{
			backgroundColor: averageColor,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-around',
		}">
		<header
			style="
				width: 100%;
				display: flex;
				justify-content: space-between;
				alignitems: center;
				padding: 1rem;
			">
			<div style="display: flex; alignitems: center">
				<img
					:src="(profile?.images?.length && profile.images[0]?.url) || ''"
					alt="Artist Image"
					class="w-32 h-32 rounded-full" />
				<div style="margin-left: 1.5rem">
					<h1 class="text-3xl font-bold">{{ profile.name }}</h1>
					<p>{{ profile.followers.total }} Followers</p>
				</div>
			</div>
			<div style="display: flex; gap: 1rem">
				<button class="btn btn-play">Play</button>
				<button class="btn btn-follow">Follow</button>
				<button class="btn btn-playlist">Add to Playlist</button>
			</div>
		</header>
	</div>
	<div>
		<h2 class="text-2xl font-semibold">Top Tracks</h2>
		<ul>
			<li v-for="track in topTracks?.tracks" :key="track.id" class="py-2">
				<Track :track="track" />
			</li>
		</ul>
	</div>
</template>

<style scoped>
.btn {
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 0.25rem;
	cursor: pointer;
	font-size: 1rem;
}
.btn-play {
	background-color: #1db954;
	color: white;
}
.btn-follow {
	background-color: #1a1a1a;
	color: white;
}
.btn-playlist {
	background-color: #535353;
	color: white;
}
</style>
