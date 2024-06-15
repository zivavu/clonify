<script setup lang="ts">
import {
	type Artist,
	type SimplifiedAlbum,
	type TopTracksResult,
} from '@spotify/web-api-ts-sdk';
import { onMounted, ref } from 'vue';

import ColorThief from 'colorthief';
import { TabsIndicator } from 'radix-vue';
import MediaList from '~/components/MediaList.vue';
import Tracks from '~/components/Tracks.vue';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';

const route = useRoute();
const artistId = route.params.id as string;

const [profile, topTracks, albums, singles] = await Promise.all([
	$fetch<Artist>(`/api/artist/profile/${artistId}`),
	$fetch<TopTracksResult>(`/api/artist/top-tracks/${artistId}`),
	$fetch<SimplifiedAlbum[]>(`/api/artist/albums/${artistId}`),
	$fetch<SimplifiedAlbum[]>(`/api/artist/singles/${artistId}`),
]);

const averageColor = ref<string | null>(null);
const colorsGradient = ref<string>();

onMounted(async () => {
	if (profile?.images?.length) {
		const image = new Image();
		image.crossOrigin = 'Anonymous';
		image.src = profile.images[0].url;

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
	{ label: 'Popular Tracks', value: 'home', visible: true },
	{ label: 'Albums', value: 'albums', visible: !!albums?.length },
	{
		label: 'Singles and EPs',
		value: 'singles',
		visible: !!singles?.length,
	},
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
					:style="{ display: tab.visible ? 'flex' : 'none' }"
					:key="tab.value"
					:value="tab.value"
					class="p-4 px-6">
					{{ tab.label }}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	</div>
	<div class="p-4" v-if="currentTab === 'home'">
		<Tracks v-if="topTracks?.tracks" :tracks="topTracks?.tracks" title="" />
	</div>
	<div class="p-4" v-if="currentTab === 'albums'">
		<MediaList v-if="albums" :items="albums" title="" :multipleRows="true" />
	</div>
	<div class="p-4" v-if="currentTab === 'singles'">
		<MediaList v-if="singles" :items="singles" title="" :multipleRows="true" />
	</div>
</template>

<style scoped>
.header-gradient {
	background-image: v-bind(colorsGradient);
}
</style>
