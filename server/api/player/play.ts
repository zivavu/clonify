import { getQuery } from 'h3';
import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { getAccessToken } from '~/server/utils/tokenHandler';

export default defineWrappedResponseHandler(async (event) => {
	const query = getQuery(event);
	const uri = query.uri as string;
	const deviceId = query.deviceId as string; // Get deviceId from the query
	const accessToken = getAccessToken(event);
	console.log(deviceId);

	if (!deviceId) {
		throw createError({
			statusCode: 400,
			message: 'Device ID is required',
		});
	}

	// Start playback on the selected device
	const response = await fetch('https://api.spotify.com/v1/me/player/play', {
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
			message: response.statusText,
		});
	}

	return await response.json();
});
