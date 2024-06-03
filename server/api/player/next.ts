import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { getAccessToken } from '~/server/utils/tokenHandler';

export default defineWrappedResponseHandler(async (event) => {
	const accessToken = getAccessToken(event);

	const response = await fetch('https://api.spotify.com/v1/me/player/next', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw createError({
			statusCode: response.status,
			message: 'Failed to skip to next track',
		});
	}

	return response.json();
});
