<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { SimplifiedTrack } from '@spotify/web-api-ts-sdk';
import { defineProps, ref } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';
import { formatTime } from '~/utils/formatTime';
import ArtistLink from './Links/ArtistLink.vue';

const props = defineProps<{
	track: SimplifiedTrack;
	hideArtistName?: Boolean;
	trackIndex?: number;
}>();

const isHovered = ref(false);
const playerStore = usePlayerStore();

const playTrack = async () => {
	await playerStore.playTrackSingleTrack(props.track);
};

const toggleHover = (state: boolean) => {
	isHovered.value = state;
};

const isPlaying = computed(
	() => playerStore.currentTrack?.id === props.track.id
);

const artistsLinks = props.track.artists.slice(0, 2);
</script>

<template>
	<div
		class="flex items-center justify-between w-full p-2 pr-4 space-x-6 rounded-lg hover:bg-neutral-800"
		@mouseover="toggleHover(true)"
		@mouseleave="toggleHover(false)"
		@dblclick="playTrack">
		<div class="flex items-center space-x-4">
			<p v-if="trackIndex" class="px-2 text-gray-400 select-none">
				{{ trackIndex }}
			</p>

			<div>
				<NuxtLink
					class="hover:underline"
					:to="{
						name: 'track-id',
						params: { id: encodeURIComponent(track.id) },
					}">
					<h3>{{ track.name }}</h3>
				</NuxtLink>
				<div class="flex items-center space-x-2">
					<p
						v-if="track.explicit"
						class="px-1 text-xs text-black rounded-[2px] bg-neutral-500">
						E
					</p>
					<ArtistLink
						v-for="(artist, index) in artistsLinks"
						:key="artist.uri"
						:artist="artist">
						<span v-if="index + 1 < artistsLinks.length">,</span>
					</ArtistLink>
				</div>
			</div>
		</div>
		<div class="flex items-center space-x-4">
			<button
				class="p-2 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-700">
				<Icon icon="mdi:heart-outline" />
			</button>
			<button
				class="p-2 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-700">
				<Icon icon="mdi:playlist-plus" />
			</button>
			<p class="text-sm text-gray-400">{{ formatTime(track.duration_ms) }}</p>
		</div>
	</div>
</template>
