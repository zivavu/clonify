import axios from 'axios';
import { defineEventHandler } from 'h3';
import type { FullTrackInfo } from '~/types/track';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const id = query.id;

	const options = {
		method: 'GET',
		url: 'https://spotify23.p.rapidapi.com/tracks/',
		params: { ids: id },
		headers: {
			'x-rapidapi-key': process.env.RAPIDAPI_KEY,
			'x-rapidapi-host': process.env.RAPIDAPI_HOST,
		},
	};

	try {
		const response = await axios.request(options);
		const trackInfo: FullTrackInfo = response.data.tracks[0];
		return trackInfo;
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'Failed to fetch track information',
		});
	}
});
