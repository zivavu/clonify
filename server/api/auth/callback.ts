import {
	createError,
	defineEventHandler,
	getQuery,
	sendRedirect,
	setCookie,
} from 'h3';

export default defineEventHandler(async (event) => {
	const { code } = getQuery(event) as { code: string };

	const clientId = process.env.SPOTIFY_CLIENT_ID!;
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
	const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

	const params = new URLSearchParams({
		grant_type: 'authorization_code',
		code: code,
		redirect_uri: redirectUri,
	});

	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
			'base64'
		)}`,
	};

	try {
		const response = await $fetch<{
			access_token: string;
			refresh_token: string;
			expires_in: number;
		}>('https://accounts.spotify.com/api/token', {
			method: 'POST',
			body: params,
			headers: headers,
		});

		setCookie(event, 'spotifyAccessToken', response.access_token, {
			maxAge: response.expires_in,
		});
		setCookie(event, 'spotifyRefreshToken', response.refresh_token, {});

		return sendRedirect(event, '/');
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'Failed to authenticate user',
		});
	}
});
