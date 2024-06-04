import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

const serverSpotifyApi = SpotifyApi.withClientCredentials(
	clientId,
	clientSecret,
	[
		'user-read-playback-state',
		'user-modify-playback-state',
		'streaming',
		'user-read-currently-playing',
		'user-read-private',
		'user-library-read',
		'user-read-email',
		'user-read-private',
	]
);

export { serverSpotifyApi };
