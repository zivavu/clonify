import type { Track } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as Track | null,
		isPlaying: false,
	}),
	getters: {
		accessToken: () => {
			const authStore = useAuthStore();
			return authStore.accessToken;
		},
	},
	actions: {
		async playTrack(track: Track) {
			this.currentTrack = track;
			this.isPlaying = true;
			await this.controlPlayback('play', track.uri);
		},
		async pauseTrack() {
			this.isPlaying = false;
			await this.controlPlayback('pause');
		},
		async resumeTrack() {
			this.isPlaying = true;
			await this.controlPlayback('play');
		},
		async controlPlayback(
			action: 'play' | 'pause' | 'next' | 'previous',
			uri?: string
		) {
			let url = `/api/player/${action}`;
			const params = uri ? { uri } : undefined;
			await $fetch(url, {
				method: 'POST',
				params,
			}).catch((error) => console.error('Error controlling playback:', error));
		},
		setPlaying(playing: boolean) {
			this.isPlaying = playing;
		},
	},
});
