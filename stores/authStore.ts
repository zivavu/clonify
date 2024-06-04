import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	actions: {
		logout() {
			clientSpotifyApi.logOut();
		},
	},
	getters: {
		isUserLoggedIn: () => clientSpotifyApi.getAccessToken() !== null,
	},
});
