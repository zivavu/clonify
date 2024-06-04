<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';

const playerStore = usePlayerStore();
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const isActive = computed(() => playerStore.isActive);
const currentTime = ref(playerStore.currentTime);
const trackDuration = computed(() => playerStore.duration);

// Load and set up Spotify SDK
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
	if (!window.Spotify) {
		window.onSpotifyWebPlaybackSDKReady = onSpotifyWebPlaybackSDKReady;
		await loadSpotifySDK();
	} else {
		playerStore.initPlayer();
	}

	watch(
		() => playerStore.isPlaying,
		(newIsPlaying) => {
			if (newIsPlaying) {
				startTimer();
			} else {
				stopTimer();
			}
		}
	);

	watch(
		() => playerStore.currentTime,
		(newCurrentTime) => {
			currentTime.value = newCurrentTime;
		}
	);

	if (playerStore.isPlaying) {
		startTimer();
	}
});

let timer: NodeJS.Timeout;
const startTimer = () => {
	timer = setInterval(() => {
		if (playerStore.isPlaying) {
			currentTime.value += 1;
		}
	}, 1000);
};

const stopTimer = () => {
	clearInterval(timer);
};

onBeforeUnmount(() => {
	stopTimer();
	if (playerStore.player) {
		playerStore.player.disconnect();
	}
});

const seek = (event: Event) => {
	const seekTime = (event.target as HTMLInputElement).valueAsNumber;
	playerStore.player?.seek(seekTime * 1000).then(() => {
		playerStore.currentTime = seekTime;
		currentTime.value = seekTime;
	});
};

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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

		<div class="flex flex-col items-center flex-1 gap-2">
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
			<div class="flex items-center w-2/3 gap-2">
				<span class="time-display">{{ formatTime(currentTime) }}</span>
				<input
					type="range"
					min="0"
					:max="trackDuration"
					step="1"
					v-model="currentTime"
					@input="seek"
					class="w-full seek-bar" />
				<span class="time-display">{{ formatTime(trackDuration) }}</span>
			</div>
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

<style scoped>
.time-display {
	font-size: 0.75rem;
}

.seek-bar {
	-webkit-appearance: none;
	width: 100%;
	height: 8px;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 2px;
	cursor: pointer;
	max-width: 700px;
}

.seek-bar:hover {
	background: rgba(30, 215, 96, 0.5); /* Greenish color on hover */
}

.seek-bar::-webkit-slider-thumb {
	-webkit-appearance: none;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: #1ed760; /* Spotify green */
	cursor: pointer;
	transition: background 0.3s ease;
}

.seek-bar::-webkit-slider-runnable-track {
	-webkit-appearance: none;
	height: 8px;
	background: #ffffff;
}

.seek-bar::-moz-range-thumb {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: #1ed760; /* Spotify green */
	cursor: pointer;
	transition: background 0.3s ease;
}

.seek-bar::-moz-range-track {
	height: 8px;
	background: #ffffff;
}

.seek-bar::-ms-thumb {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background: #1ed760; /* Spotify green */
	cursor: pointer;
	transition: background 0.3s ease;
}

.seek-bar::-ms-track {
	height: 8px;
	background: #ffffff;
	border-color: transparent;
	color: transparent;
}
</style>
