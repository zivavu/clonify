<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';
import { Slider } from '../ui/slider';

const playerStore = usePlayerStore();
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const isActive = computed(() => playerStore.isActive);
const currentTime = ref(playerStore.currentTime);
const currentTimeModel = computed(() => [Math.floor(currentTime.value)]);
const trackDuration = computed(() => playerStore.duration);

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
	clientSpotifyApi.player.seekToPosition(seekTime * 1000).then(() => {
		playerStore.currentTime = seekTime;
		currentTime.value = seekTime;
	});
};
</script>

<template>
	<div
		class="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4 text-white bg-gray-800 rounded-t-xl"
		v-if="isActive">
		<div class="flex items-center gap-4">
			<img
				v-if="currentTrack?.album?.images[0]?.url"
				:src="currentTrack.album.images[0].url"
				alt="Cover Art"
				class="w-16 h-16 rounded" />
			<div class="w-96">
				<h3 class="truncate">{{ currentTrack?.name }}</h3>
				<p>{{ currentTrack?.artists[0]?.name }}</p>
			</div>
		</div>

		<div class="flex flex-col items-center gap-2">
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
			<div class="flex items-center gap-2">
				<span class="time-display">{{ formatTime(currentTime) }}</span>
				<Slider
					:min="0"
					:max="trackDuration"
					:step="1"
					v-model="currentTimeModel"
					class="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform w-[600px]" />
				<span>{{ formatTime(trackDuration) }}</span>
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
