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

	const artist = await serverSpotifyApi.artists.get(artistId);

	return artist;
});
