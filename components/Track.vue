<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Track } from '@spotify/web-api-ts-sdk';
import { defineProps, ref } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';
import { formatTime } from '~/utils/formatTime';

const props = defineProps<{
	track: Track;
}>();

const isHovered = ref(false);
const playerStore = usePlayerStore();

const playTrack = async () => {
	const player = playerStore.player;
	if (player) {
		const state = await player.getCurrentState();
		if (state) {
			player.nextTrack();
			player.togglePlay();

			playerStore.setCurrentTrack(props.track);
		}
	}
};

const toggleHover = (state: boolean) => {
	isHovered.value = state;
};
</script>

<template>
	<div
		class="flex items-center justify-between w-full p-2 pr-4 space-x-6 rounded-lg hover:bg-neutral-900"
		@mouseover="toggleHover(true)"
		@mouseleave="toggleHover(false)"
		@click="playTrack">
		<div class="flex items-center space-x-4">
			<NuxtLink
				class="relative"
				:to="{
					name: 'track-uri',
					params: { uri: encodeURIComponent(track.uri) },
				}">
				<img
					:src="track.album.images[0]?.url"
					alt="Cover Art"
					class="w-12 h-12 rounded" />
				<Icon
					v-if="isHovered"
					icon="ic:round-play-circle"
					class="absolute inset-0 m-auto text-4xl text-white bg-opacity-50" />
			</NuxtLink>
			<div>
				<NuxtLink
					class="hover:underline"
					:to="{
						name: 'track-uri',
						params: { uri: encodeURIComponent(track.uri) },
					}">
					<h3 class="text-lg font-semibold">{{ track.name }}</h3>
				</NuxtLink>
				<div class="flex items-center space-x-2">
					<p v-if="track.explicit" class="text-xs font-bold text-red-500">E</p>
					<NuxtLink
						class="hover:underline"
						:to="{
							name: 'artist-uri',
							params: { uri: encodeURIComponent(track.artists[0]?.uri) },
						}">
						<p>{{ track.artists[0]?.name }}</p>
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
