import { H3Event, createError, getCookie } from 'h3';

export const getAccessToken = (event: H3Event): string => {
	const accessToken = getCookie(event, 'spotifyAccessToken');

	if (!accessToken) {
		throw createError({
			statusCode: 401,
			message: 'No access token found',
		});
	}

	return accessToken;
};
