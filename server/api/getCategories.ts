import { defineWrappedResponseHandler } from '~/server/utils/apiRouteHandler';
import { api } from '~/utils/spotify';

export default defineWrappedResponseHandler(async () => {
	const response = await api.browse.getCategories();
	return response;
});
