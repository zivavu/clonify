<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';
import { formatTime } from '~/utils/formatTime';

// Pinia store for player state
const playerStore = usePlayerStore();
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const isActive = computed(() => playerStore.isActive);
const currentTime = ref(0);

const loadSpotifySDK = () => {
	return new Promise<void>((resolve) => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;
		document.body.appendChild(script);
		script.onload = () => resolve();
	});
};

function onSpotifyWebPlaybackSDKReady() {
	playerStore.initPlayer();
}

onMounted(async () => {
	console.log('PlayerBar component mounted');
	if (!window.Spotify) {
		window.onSpotifyWebPlaybackSDKReady = onSpotifyWebPlaybackSDKReady;
		await loadSpotifySDK();
	} else {
		playerStore.initPlayer();
	}
});

onBeforeUnmount(() => {
	console.log('PlayerBar component before unmount');
	if (playerStore.player) {
		playerStore.player.disconnect();
	}
});

const onTimeUpdate = (event: Event) => {
	currentTime.value = (event.target as HTMLAudioElement).currentTime;
};
</script>

<template>
	<div
		class="fixed bottom-0 flex items-center w-full px-4 py-2 text-white bg-gray-900"
		v-if="isActive">
		<div class="flex items-center w-full space-x-4">
			<img
				v-if="currentTrack?.album?.images[0]?.url"
				:src="currentTrack.album.images[0].url"
				class="object-cover w-16 h-16"
				alt="Track Cover" />
			<div class="flex flex-col justify-center flex-1">
				<p class="text-lg font-semibold">{{ currentTrack?.name }}</p>
				<p class="text-sm text-gray-400">
					{{ currentTrack?.artists[0]?.name }}
				</p>
			</div>
			<button
				@click="playerStore.previousTrack"
				class="p-2 rounded bg-neutral-800">
				<Icon icon="mdi:skip-previous" class="text-2xl" />
			</button>
			<button
				@click="playerStore.togglePlay"
				class="p-2 rounded bg-neutral-800">
				<div v-if="isPlaying">
					<Icon icon="mdi:pause" class="text-2xl" />
				</div>
				<div v-else>
					<Icon icon="mdi:play" class="text-2xl" />
				</div>
			</button>
			<button @click="playerStore.nextTrack" class="p-2 rounded bg-neutral-800">
				<Icon icon="mdi:skip-next" class="text-2xl" />
			</button>
		</div>
		<div class="flex items-center space-x-2">
			<p>{{ formatTime(currentTime * 1000) }}</p>
			<input
				type="range"
				class="w-full"
				:max="currentTrack ? currentTrack.duration_ms / 1000 : 100"
				v-model="currentTime"
				@input="onTimeUpdate" />
			<p>{{ formatTime(currentTrack?.duration_ms || 0) }}</p>
		</div>
	</div>
	<div
		v-else
		class="fixed bottom-0 flex items-center w-full px-4 py-2 text-white bg-gray-900">
		<p class="flex-1 text-center">Loading Spotify Web Playback SDK...</p>
	</div>
</template>
