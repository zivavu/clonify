import type { Track } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
	state: () => ({
		currentTrack: null as Spotify.Track | Track | null,
		player: null as Spotify.Player | null,
		isPlaying: false,
		isActive: false,
		currentTime: 0,
		device_id: null as string | null,
	}),
	actions: {
		async initPlayer() {
			const token = await this.getAccessToken;

			if (!token) {
				clientSpotifyApi.authenticate();
				return;
			}

			const player = new Spotify.Player({
				name: 'Clonify Player',
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
			this.device_id = device_id;
			const token = await this.getAccessToken;

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
			clientSpotifyApi.player.addItemToPlaybackQueue(
				trackUri,
				this.device_id || undefined
			);
		},
		async playTrack(track: Spotify.Track | Track, contextUri?: string) {
			if (!this.device_id) return;
			if (this.currentTrack?.id === track.id && this.isPlaying) {
				const track = await clientSpotifyApi.player.getCurrentlyPlayingTrack();
				this.currentTime = track.progress_ms;
				await clientSpotifyApi.player.pausePlayback(this.device_id);
				return;
			}
			clientSpotifyApi.player.startResumePlayback(
				this.device_id,
				contextUri,
				[track.uri],
				undefined,
				this.currentTime
			);
			console.log(this.currentTime);
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
	getters: {
		getAccessToken: async () => {
			const getTokenRes = await clientSpotifyApi.getAccessToken();
			const token = getTokenRes?.access_token;
			return token;
		},
	},
});
