import { defineEventHandler, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
	const clientId = process.env.SPOTIFY_CLIENT_ID!;
	const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
	const scopes =
		'user-read-playback-state user-modify-playback-state streaming user-read-currently-playing user-read-private user-library-read user-read-email user-read-private';

	if (!clientId || !redirectUri) {
		throw createError({
			statusCode: 500,
			message: 'Missing client ID or redirect URI',
		});
	}

	const params = new URLSearchParams({
		client_id: clientId,
		response_type: 'code',
		redirect_uri: redirectUri,
		scope: scopes,
	});

	return sendRedirect(
		event,
		`https://accounts.spotify.com/authorize?${params.toString()}`
	);
});
