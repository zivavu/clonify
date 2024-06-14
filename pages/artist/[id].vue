<script setup lang="ts">
import { type Artist, type TopTracksResult } from '@spotify/web-api-ts-sdk';
import { onMounted, ref } from 'vue';

import ColorThief from 'colorthief';
import { TabsIndicator } from 'radix-vue';
import Track from '~/components/Track.vue';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

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
const isShowMore = ref<boolean>(false);

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
const tabs = [
	{ label: 'Home', value: 'home' },
	{ label: 'Albums', value: 'albums' },
	{ label: 'Singles and EPs', value: 'singles' },
	{ label: 'About', value: 'about' },
];
const currentTab = ref(tabs[0].value);
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
					<h1 class="font-bold text-8xl">{{ profile.name }}</h1>
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
			<!-- <div>
				<button class="btn btn-play">Play</button>
				<Button variant="ghost" class="btn btn-follow">Follow</Button>
				<button class="btn btn-playlist">Add to Playlist</button>
			</div> -->
		</header>
		<Tabs
			:model-value="currentTab"
			@update:model-value="(value) => (currentTab = value.toString())"
			class="border-b">
			<TabsList class="relative bg-transparent h-max">
				<TabsIndicator
					class="absolute px-3 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300">
					<div class="w-full h-full bg-[#15883E]" />
				</TabsIndicator>
				<TabsTrigger
					v-for="tab in tabs"
					:key="tab.value"
					:value="tab.value"
					class="p-4 px-6">
					{{ tab.label }}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	</div>
	<div class="p-4">
		<h2 class="text-2xl font-semibold">Popular</h2>
		<ul>
			<li
				v-for="(track, i) in topTracks?.tracks.slice(0, isShowMore ? 10 : 5)"
				:key="track.id">
				<Track
					:track="track"
					:context-uri="profile?.uri"
					:track-index="i + 1" />
			</li>
		</ul>
		<Button
			class="flex flex-row items-center content-center space-x-2"
			@click="isShowMore = !isShowMore">
			<p class="text-neutral-300">
				{{ isShowMore ? 'Show less' : 'Show more' }}
			</p>
		</Button>
	</div>
</template>

<style scoped>
.header-gradient {
	background-image: v-bind(colorsGradient);
}
</style>
