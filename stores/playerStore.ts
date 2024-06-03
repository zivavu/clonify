import type { Track } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';
import { useAuthStore } from '~/stores/authStore';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as Spotify.Track | Track | null,
		player: null as Spotify.Player | null,
		isPlaying: false,
		isActive: false,
		currentTime: 0,
	}),
	actions: {
		async initPlayer() {
			const authStore = useAuthStore();
			const token = authStore.accessToken;

			if (!token) return;

			const player = new Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5,
			});

			player.addListener('ready', async ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				this.isActive = true;
				await this.setDevice(device_id);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
				this.isActive = false;
			});

			player.addListener('player_state_changed', (state) => {
				if (!state) {
					return;
				}
				this.currentTime = state.position / 1000;
				this.isPlaying = !state.paused;
				this.setCurrentTrack(state.track_window.current_track);
				player.getCurrentState().then((state) => {
					this.isActive = !!state;
				});
			});

			player.connect().then((success) => {
				if (success) {
					console.log(
						'The Web Playback SDK successfully connected to Spotify!'
					);
					this.setPlayer(player);
				} else {
					console.error('The Web Playback SDK could not connect to Spotify');
				}
			});

			this.setPlayer(player);
		},
		async setDevice(device_id: string) {
			const authStore = useAuthStore();
			const token = authStore.accessToken;
			if (!token) return;

			try {
				await $fetch('https://api.spotify.com/v1/me/player', {
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						device_ids: [device_id],
						play: false,
					}),
				});
				console.log(`Set device to ${device_id}`);
			} catch (error) {
				console.error('Failed to set device', error);
			}
		},
		async addToQueue(trackUri: string) {
			const authStore = useAuthStore();
			const token = authStore.accessToken;
			if (!token) return;

			try {
				console.log(`Adding ${trackUri} to queue`);
				await $fetch(`https://api.spotify.com/v1/me/player/queue`, {
					method: 'POST',
					params: { uri: trackUri },
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				});
				console.log(`Added ${trackUri} to queue`);
			} catch (error) {
				console.error('Failed to add to queue', error);
			}
		},
		async playTrack(track: Spotify.Track | Track) {
			const player = this.player;
			if (player) {
				console.log('Adding to queue');
				await this.addToQueue(track.uri);
				await player.nextTrack();
				this.setCurrentTrack(track);
			}
		},
		setCurrentTrack(track: Spotify.Track | Track) {
			this.currentTrack = track;
		},
		setPlayer(player: Spotify.Player | null) {
			this.player = player;
		},
		togglePlay() {
			this.player?.togglePlay();
		},
		nextTrack() {
			this.player?.nextTrack();
		},
		previousTrack() {
			this.player?.previousTrack();
		},
	},
});
