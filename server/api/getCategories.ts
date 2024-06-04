import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { serverSpotifyApi } from './serverSpotifyApi';

export default defineWrappedResponseHandler(async () => {
	const response = await serverSpotifyApi.browse.getCategories();
	return response;
});
