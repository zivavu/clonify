<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';

// Player Store
const playerStore = usePlayerStore();

// Computed properties for player state
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const volume = computed(() => playerStore.volume);
const playMode = computed(() => playerStore.playMode);
const queue = computed(() => playerStore.queue);

const currentTime = ref(0);

// Play/pause functionality
const togglePlayPause = () => {
	playerStore.togglePlayPause();
};

// Skip to next track
const nextTrack = () => {
	playerStore.skipToNextTrack();
};

// Skip to previous track (dummy function, implement logic as needed)
const prevTrack = () => {
	console.log('Previous track logic goes here');
};

// Shuffle functionality
const toggleShuffle = () => {
	const newMode = playMode.value === 'shuffle' ? 'normal' : 'shuffle';
	playerStore.setPlayMode(newMode);
};

// Repeat functionality
const toggleRepeat = () => {
	const newMode = playMode.value === 'repeat' ? 'normal' : 'repeat';
	playerStore.setPlayMode(newMode);
};

// Volume control
const setVolume = (event: Event) => {
	// @ts-ignore
	playerStore.setVolume(event.target.value);
};
</script>

<template>
	<div
		class="sticky bottom-0 left-0 right-0 flex items-center justify-between p-4 text-white bg-gray-800 rounded-t-xl">
		<!-- Track Info -->
		<div class="flex items-center gap-4">
			<img
				v-if="currentTrack"
				:src="currentTrack.data.albumOfTrack.coverArt.sources[0].url"
				alt="Cover Art"
				class="w-16 h-16 rounded" />
			<div>
				<h3 class="text-xl">{{ currentTrack?.data.name }}</h3>
				<p>
					{{ currentTrack?.data.artists.items[0].profile.name }} -
					{{ currentTrack?.data.albumOfTrack.name }}
				</p>
			</div>
		</div>

		<!-- Player Controls -->
		<div class="flex items-center gap-4">
			<button @click="prevTrack">
				<Icon
					icon="mdi:skip-previous-circle"
					class="w-10 h-10 text-white hover:text-neutral-400" />
			</button>
			<button @click="togglePlayPause">
				<Icon
					:icon="isPlaying ? 'ic:round-pause-circle' : 'ic:round-play-circle'"
					class="w-10 h-10 text-white hover:text-neutral-400" />
			</button>
			<button @click="nextTrack">
				<Icon
					icon="mdi:skip-next-circle"
					class="w-10 h-10 text-white hover:text-neutral-400" />
			</button>
			<button @click="toggleShuffle">
				<Icon
					:icon="
						playMode === 'shuffle' ? 'mdi:shuffle' : 'mdi:shuffle-disabled'
					"
					class="w-8 h-8 text-white hover:text-neutral-400" />
			</button>
			<button @click="toggleRepeat">
				<Icon
					:icon="playMode === 'repeat' ? 'mdi:repeat-once' : 'mdi:repeat'"
					class="w-8 h-8 text-white hover:text-neutral-400" />
			</button>
		</div>

		<!-- Extra Controls -->
		<div class="flex items-center gap-4">
			<button>
				<Icon
					icon="mdi:heart-outline"
					class="w-8 h-8 text-white hover:text-neutral-400" />
			</button>
			<button>
				<Icon
					icon="mdi:playlist-plus"
					class="w-8 h-8 text-white hover:text-neutral-400" />
			</button>
			<input
				type="range"
				min="0"
				max="100"
				:value="volume"
				class="cursor-pointer"
				@input="setVolume" />
			<span class="text-white">{{ volume }}%</span>
		</div>
	</div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
