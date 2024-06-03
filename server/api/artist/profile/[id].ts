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

	const artist = await api.artists.get(artistId);

	return artist;
});
