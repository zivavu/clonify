import { defineEventHandler, getQuery } from 'h3';
import { serverSpotifyApi } from './serverSpotifyApi';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const id = query.id as string;

	try {
		const trackInfo = await serverSpotifyApi.tracks.get(id);
		return trackInfo;
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'Failed to fetch track information',
		});
	}
});
