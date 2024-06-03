import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { api } from '~/utils/spotify';

export default defineWrappedResponseHandler(async (event) => {
	const artistId = event?.context?.params?.id;
	console.log('id', event.context.params?.id);

	if (!artistId) {
		return createError({
			statusCode: 400,
			message: 'Missing artist id',
		});
	}

	const topTrack = await api.artists.topTracks(artistId, 'US');

	return topTrack;
});
