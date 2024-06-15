import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { serverSpotifyApi } from './serverSpotifyApi';

export default defineWrappedResponseHandler(async (event) => {
	const albumId = event?.context?.params?.id;

	if (!albumId) {
		return createError({
			statusCode: 400,
			message: 'Missing album id',
		});
	}

	const albums = await serverSpotifyApi.albums.get(albumId);

	return albums;
});
