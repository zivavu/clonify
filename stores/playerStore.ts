import axios from 'axios';
import type { PartialTrackInfo } from '~/types/search';
import type { FullTrackInfo } from '~/types/track';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as FullTrackInfo | null,
		queue: [] as FullTrackInfo[],
		isPlaying: false,
		volume: 50,
		playMode: 'normal',
		parentUri: null as string | null,
	}),
	actions: {
		async playTrackFromPartialInfo(track: PartialTrackInfo) {
			try {
				const response = await axios.get(`/api/getTrack`, {
					params: { id: track.data.id },
				});
				const fullTrackInfo: FullTrackInfo = response.data;
				this.currentTrack = fullTrackInfo;
				this.isPlaying = true;
			} catch (error) {
				console.error('Failed to fetch full track info:', error);
			}
		},
		playTrack(track: FullTrackInfo) {
			this.currentTrack = track;
			this.isPlaying = true;
		},
		addToQueue(track: FullTrackInfo) {
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
