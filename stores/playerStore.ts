import { defineStore } from 'pinia';
import type { TrackItem } from '~/types/search';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as TrackItem | null,
		queue: [] as TrackItem[],
		isPlaying: false,
		volume: 50,
		playMode: 'normal',
		parentUri: null as string | null,
	}),
	actions: {
		playTrack(track: TrackItem) {
			this.currentTrack = track;
			console.log(track);
			this.isPlaying = true;
		},
		addToQueue(track: TrackItem) {
			this.queue.push(track);
		},
		setVolume(volume: number) {
			this.volume = volume;
		},
		togglePlayPause() {
			this.isPlaying = !this.isPlaying;
		},
		setPlayMode(mode: string) {
			if (['normal', 'repeat', 'shuffle'].includes(mode)) {
				this.playMode = mode;
			}
		},
		setParentUri(uri: string) {
			this.parentUri = uri;
		},
		skipToNextTrack() {
			if (this.queue.length > 0) {
				this.currentTrack = this.queue.shift() || null;
			} else {
				this.currentTrack = null;
				this.isPlaying = false;
			}
		},
	},
});
