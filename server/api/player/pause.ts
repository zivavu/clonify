import { defineEventHandler, getCookie, sendError } from 'h3';

export default defineEventHandler(async (event) => {
	try {
		const accessToken = getCookie(event, 'spotifyAccessToken');

		if (!accessToken) {
			throw createError({
				statusCode: 401,
				message: 'No access token found',
			});
		}

		const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				message: 'Failed to pause playback',
			});
		}

		return response.json();
	} catch (error) {
		console.error('Error controlling playback:', error);
		return sendError(event, error);
	}
});
