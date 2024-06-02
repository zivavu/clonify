import type { Track } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as Track | null,
		isPlaying: false,
	}),
	actions: {
		playTrack(track: Track) {
			this.currentTrack = track;
			this.isPlaying = true;
		},
		pauseTrack() {
			this.isPlaying = false;
		},
		togglePlay() {
			this.isPlaying = !this.isPlaying;
		},
		setPlaying(playing: boolean) {
			this.isPlaying = playing;
		},
	},
});
