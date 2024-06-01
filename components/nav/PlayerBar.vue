<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref, watch } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';

// Player Store
const playerStore = usePlayerStore();

// Computed properties for player state
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const volume = computed(() => playerStore.volume);
const playMode = computed(() => playerStore.playMode);
const queue = computed(() => playerStore.queue);

// Audio element for playing track preview
const audio = ref<HTMLAudioElement | null>(null);

watch(currentTrack, (newTrack) => {
	if (newTrack && newTrack.preview_url) {
		audio.value = new Audio(newTrack.preview_url);
		audio.value.volume = volume.value / 100;
		audio.value.play();
		playerStore.isPlaying = true;
	} else if (audio.value) {
		audio.value.pause();
		audio.value = null;
	}
});

watch(isPlaying, (playing) => {
	if (audio.value) {
		if (playing) {
			audio.value.play();
		} else {
			audio.value.pause();
		}
	}
});

watch(volume, (newVolume) => {
	if (audio.value) {
		audio.value.volume = newVolume / 100;
	}
});

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
</script>

<template>
	<div
		class="sticky bottom-0 flex items-center justify-between p-4 text-white bg-gray-800 rounded-t-xl">
		<!-- Track Info -->
		<div class="flex items-center gap-4">
			<nuxt-img
				v-if="currentTrack"
				:src="currentTrack.album.images[0].url"
				alt="Cover Art"
				class="w-16 h-16 rounded" />
			<div v-if="currentTrack">
				<h3 class="text-xl">{{ currentTrack.name }}</h3>
				<p>
					{{ currentTrack.artists[0].name }} - {{ currentTrack.album.name }}
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
		</div>
	</div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
