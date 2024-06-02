import { defineEventHandler, getCookie, getQuery, sendError } from 'h3';

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const uri = query.uri as string;
		const accessToken = getCookie(event, 'spotifyAccessToken');

		if (!accessToken) {
			throw createError({
				statusCode: 401,
				message: 'No access token found',
			});
		}

		// Fetch available devices
		let response = await fetch('https://api.spotify.com/v1/me/player/devices', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				message: 'Failed to fetch devices',
			});
		}

		const { devices } = await response.json();

		console.log(devices);
		// Check if there are any active devices
		if (!devices.length) {
			throw createError({
				statusCode: 404,
				message: 'No active devices found',
			});
		}

		// Use the first available device
		const deviceId = devices[0].id;

		// Start playback on the selected device
		response = await fetch('https://api.spotify.com/v1/me/player/play', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				device_id: deviceId,
				uris: uri ? [uri] : undefined,
			}),
		});

		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				message: 'Failed to start playback',
			});
		}

		return await response.json();
	} catch (error) {
		console.error('Error controlling playback:', error);
		return sendError(event, error);
	}
});
