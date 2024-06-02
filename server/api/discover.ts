import { defineEventHandler } from 'h3';
import { api } from '~/utils/spotify';

export default defineEventHandler(async (event) => {
	try {
		const response = await api.browse.getCategories('US', '30');
		return response;
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'Failed to fetch discover categories',
		});
	}
});
