<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Track } from '@spotify/web-api-ts-sdk';
import { defineProps, ref } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';
import { formatTime } from '~/utils/formatTime';

const props = defineProps<{
	track: Track;
	showArtistName?: Boolean;
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
</script>

<template>
	<div
		class="flex items-center justify-between w-full p-2 pr-4 space-x-6 rounded-lg hover:bg-neutral-900"
		@mouseover="toggleHover(true)"
		@mouseleave="toggleHover(false)"
		@dblclick="playTrack">
		<div class="flex items-center space-x-4">
			<NuxtLink class="relative cursor-pointer" @click="playTrack">
				<img
					:src="track.album.images[0]?.url"
					alt="Cover Art"
					class="w-12 h-12 rounded" />
				<div
					v-if="isHovered"
					class="absolute top-0 z-10 w-full h-full backdrop-brightness-50">
					<Icon
						:icon="`${isPlaying ? 'ic:round-pause' : 'flowbite:play-solid'}`"
						class="absolute inset-0 m-auto text-4xl text-white" />
				</div>
			</NuxtLink>
			<div>
				<NuxtLink
					class="hover:underline"
					:to="{
						name: 'track-id',
						params: { id: encodeURIComponent(track.id) },
					}">
					<h3 class="text-lg font-semibold">{{ track.name }}</h3>
				</NuxtLink>
				<div class="flex items-center space-x-2">
					<p v-if="track.explicit" class="text-xs font-bold text-red-500">E</p>
					<NuxtLink
						class="hover:underline"
						:to="{
							name: 'artist-id',
							params: { id: encodeURIComponent(track.artists[0]?.id) },
						}">
						<p v-show="showArtistName !== false">
							{{ track.artists[0]?.name }}
						</p>
					</NuxtLink>
				</div>
			</div>
		</div>
		<div class="flex items-center space-x-4">
			<button
				class="p-2 rounded bg-neutral-800 text-neutral-100 hover:bg-neutral-700">
				<Icon icon="mdi:heart-outline" />
			</button>
			<button
				class="p-2 rounded bg-neutral-800 text-neutral-100 hover:bg-neutral-700">
				<Icon icon="mdi:playlist-plus" />
			</button>
			<p class="text-sm text-gray-400">{{ formatTime(track.duration_ms) }}</p>
		</div>
	</div>
</template>
