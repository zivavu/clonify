<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useAuthStore } from '~/stores/authStore';
import { usePlayerStore } from '~/stores/playerStore';
import { formatTime } from '~/utils/formatTime';

// Pinia store for player state
const playerStore = usePlayerStore();
const authStore = useAuthStore();
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = ref(false);
const isActive = ref(false);
const currentTime = ref(0);
let player: Spotify.Player | null = null;

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
	initPlayer();
}

const initPlayer = () => {
	const token = authStore.accessToken;

	if (!token) return;
	player = new Spotify.Player({
		name: 'Web Playback SDK',
		getOAuthToken: (cb) => {
			cb(token);
		},
		volume: 0.5,
	});

	player.addListener('ready', ({ device_id }) => {
		console.log('Ready with Device ID', device_id);
		isActive.value = true;
	});

	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
		isActive.value = false;
	});

	player.setName('Cloanify');

	player.addListener('player_state_changed', (state) => {
		if (!state) {
			return;
		}
		console.log('Player State Changed:', state);
		currentTime.value = state.position / 1000;
		isPlaying.value = !state.paused;
		playerStore.setCurrentTrack(state.track_window.current_track);
		player?.getCurrentState().then((state) => {
			isActive.value = !!state;
		});
	});

	player.connect().then((success) => {
		if (success) {
			console.log('The Web Playback SDK successfully connected to Spotify!');
			playerStore.setPlayer(player); // Ustawienie instancji odtwarzacza w store
		} else {
			console.error('The Web Playback SDK could not connect to Spotify');
		}
	});
};

onMounted(async () => {
	console.log('PlayerBar component mounted');
	if (!window.Spotify) {
		window.onSpotifyWebPlaybackSDKReady = onSpotifyWebPlaybackSDKReady;
		await loadSpotifySDK();
	} else {
		initPlayer();
	}
});

onBeforeUnmount(() => {
	console.log('PlayerBar component before unmount');
	if (player) {
		player.disconnect();
	}
});

const togglePlay = () => {
	player?.togglePlay();
};

const nextTrack = () => {
	player?.nextTrack();
};

const previousTrack = () => {
	player?.previousTrack();
};

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
			<button @click="previousTrack" class="p-2 rounded bg-neutral-800">
				<Icon icon="mdi:skip-previous" class="text-2xl" />
			</button>
			<button @click="togglePlay" class="p-2 rounded bg-neutral-800">
				<div v-if="isPlaying">
					<Icon icon="mdi:pause" class="text-2xl" />
				</div>
				<div v-else>
					<Icon icon="mdi:play" class="text-2xl" />
				</div>
			</button>
			<button @click="nextTrack" class="p-2 rounded bg-neutral-800">
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
