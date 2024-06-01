import { defineEventHandler, getQuery } from 'h3';
import { api } from '~/utils/spotify';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const searchTerm = query.q as string;

	if (!searchTerm) {
		return { albums: [], artists: [], tracks: [], playlists: [] };
	}

	try {
		const response = await api.search(searchTerm, [
			'album',
			'artist',
			'track',
			'playlist',
		]);
		return response;
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'Failed to fetch search results',
		});
	}
});
