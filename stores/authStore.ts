import { defineStore } from 'pinia';
import { getCookie, removeCookie, setCookie } from '~/utils/cookies';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		accessToken: null as string | null,
		refreshToken: null as string | null,
	}),
	actions: {
		initializeTokens() {
			this.accessToken = getCookie('spotifyAccessToken') || null;
			this.refreshToken = getCookie('spotifyRefreshToken') || null;
		},

		async fetchAccessToken() {
			if (!this.refreshToken) {
				console.error('No refresh token found. User needs to log in again.');
				return;
			}

			try {
				// Pobieranie nowego tokenu za pomocą endpointu API
				const response = await $fetch('/api/auth/token');
				this.accessToken = response.accessToken;
				this.refreshToken = response.refreshToken;

				// Ustawianie tokenów w ciasteczkach
				this.setTokens(response.accessToken, response.refreshToken);
			} catch (error) {
				console.error('Failed to fetch access token', error);
			}
		},

		setTokens(accessToken: string, refreshToken: string) {
			this.accessToken = accessToken;
			this.refreshToken = refreshToken;

			// Ustawianie tokenów w ciasteczkach
			setCookie('spotifyAccessToken', accessToken, 1); // Token dostępu wygasa po 1 dniu
			setCookie('spotifyRefreshToken', refreshToken, 30); // Token odświeżający wygasa po 30 dniach
		},

		clearTokens() {
			this.accessToken = null;
			this.refreshToken = null;

			// Usuwanie tokenów z ciasteczek
			removeCookie('spotifyAccessToken');
			removeCookie('spotifyRefreshToken');
		},
	},
});
