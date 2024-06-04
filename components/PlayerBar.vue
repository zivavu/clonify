<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';

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
		class="sticky bottom-0 left-0 right-0 flex items-center justify-between p-4 text-white bg-gray-800 rounded-t-xl"
		v-if="isActive">
		<div class="flex items-center gap-4">
			<img
				v-if="currentTrack?.album?.images[0]?.url"
				:src="currentTrack.album.images[0].url"
				alt="Cover Art"
				class="w-16 h-16 rounded" />
			<div>
				<h3 class="text-xl">{{ currentTrack?.name }}</h3>
				<p>
					{{ currentTrack?.artists[0]?.name }} -
					{{ currentTrack?.album.name }}
				</p>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<button @click="playerStore.previousTrack">
				<Icon
					icon="mdi:skip-previous-circle"
					class="w-10 h-10 text-white hover:text-neutral-400" />
			</button>
			<button @click="playerStore.togglePlay">
				<Icon
					:icon="isPlaying ? 'ic:round-pause-circle' : 'ic:round-play-circle'"
					class="w-10 h-10 text-white hover:text-neutral-400" />
			</button>
			<button @click="playerStore.nextTrack">
				<Icon
					icon="mdi:skip-next-circle"
					class="w-10 h-10 text-white hover:text-neutral-400" />
			</button>
		</div>

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
