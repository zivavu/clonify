<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { usePlayerStore } from '~/stores/playerStore';
import { formatTime } from '~/utils/formatTime';

const playerStore = usePlayerStore();
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const currentTime = ref(0);

const togglePlay = () => {
	isPlaying.value ? playerStore.pauseTrack() : playerStore.resumeTrack();
};

const nextTrack = () => {
	playerStore.controlPlayback('next');
};

const previousTrack = () => {
	playerStore.controlPlayback('previous');
};

const onTimeUpdate = (event: Event) => {
	currentTime.value = (event.target as HTMLAudioElement).currentTime;
};
</script>

<template>
	<div
		class="fixed bottom-0 flex items-center w-full px-4 py-2 text-white bg-gray-900">
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
				v-bind:max="currentTrack ? currentTrack.duration_ms / 1000 : 100"
				v-model="currentTime" />
			<p>{{ formatTime(currentTrack?.duration_ms || 0) }}</p>
		</div>
		<audio
			v-if="currentTrack"
			:src="currentTrack.preview_url || undefined"
			@timeupdate="onTimeUpdate"
			@play="playerStore.setPlaying(true)"
			@pause="playerStore.setPlaying(false)"
			ref="audioElement"></audio>
	</div>
</template>
