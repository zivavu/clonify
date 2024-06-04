import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { serverSpotifyApi } from '../../serverSpotifyApi';

export default defineWrappedResponseHandler(async (event) => {
	const artistId = event?.context?.params?.id;

	if (!artistId) {
		return createError({
			statusCode: 400,
			message: 'Missing artist id',
		});
	}

	const topTrack = await serverSpotifyApi.artists.topTracks(artistId, 'US');

	return topTrack;
});
