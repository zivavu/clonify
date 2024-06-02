import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		accessToken: null as string | null,
		refreshToken: null as string | null,
	}),
	actions: {
		async fetchAccessToken() {
			try {
				const response = await $fetch('/api/auth/token');
				this.accessToken = response.accessToken;
				this.refreshToken = response.refreshToken;
			} catch (error) {
				console.error('Failed to fetch access token', error);
			}
		},
	},
});
