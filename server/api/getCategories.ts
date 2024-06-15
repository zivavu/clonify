import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { serverSpotifyApi } from './serverSpotifyApi';

export default defineWrappedResponseHandler(async () => {
	const { categories } = await serverSpotifyApi.browse.getCategories(
		undefined,
		undefined,
		35
	);
	return categories.items;
});
