import type { Track } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as Track | null,
		isPlaying: false,
		deviceId: null as string | null, // Add deviceId
	}),

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
			const url = `/api/player/${action}`;
			const params = {
				uri,
				deviceId: this.deviceId, // Include deviceId
			};
			await $fetch(url, { method: 'POST', params }).catch((error) =>
				console.error('Error controlling playback:', error)
			);
		},
		setPlaying(playing: boolean) {
			this.isPlaying = playing;
		},
		setCurrentTrack(track: Track) {
			this.currentTrack = track;
		},
		setDeviceId(id: string) {
			// New action to set deviceId
			this.deviceId = id;
		},
	},
});
