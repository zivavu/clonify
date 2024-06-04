import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const clientSpotifyApi = SpotifyApi.withUserAuthorization(
	'18d3c9ff3cc6431b84ce39cf06eada53',
	'http://localhost:3000',
	[
		'user-read-email',
		'user-read-private',
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

export { clientSpotifyApi };
