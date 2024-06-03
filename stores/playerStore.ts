import type { Track } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as Track | null,
		player: null as Spotify.Player | null,
	}),
	actions: {
		setCurrentTrack(track: Track) {
			this.currentTrack = track;
		},
		setPlayer(player: Spotify.Player | null) {
			this.player = player;
		},
	},
});
