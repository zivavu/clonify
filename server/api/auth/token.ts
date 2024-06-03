import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
	const refreshToken = getCookie('spotifyRefreshToken');

	if (!refreshToken) {
		throw createError({
			statusCode: 401,
			message: 'No refresh token found',
		});
	}

	const clientId = process.env.SPOTIFY_CLIENT_ID!;
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
	const params = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
	});

	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
			'base64'
		)}`,
	};

	try {
		const response: {
			access_token: string;
			expires_in: number;
			refresh_token: string;
		} = await $fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			body: params,
			headers: headers,
		});

		setCookie('spotifyAccessToken', response.access_token, {
			maxAge: response.expires_in,
		});

		return {
			accessToken: response.access_token,
			refreshToken: response.refresh_token,
		};
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'Failed to refresh token',
		});
	}
});
