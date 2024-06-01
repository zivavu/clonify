import axios from 'axios';
import { defineEventHandler, getQuery } from 'h3';
import type { SearchData } from '~/types/search';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const searchTerm = query.q;

	const options = {
		method: 'GET',
		url: 'https://spotify23.p.rapidapi.com/search/',
		params: {
			q: searchTerm,
			type: 'multi',
			offset: '0',
			limit: '10',
			numberOfTopResults: '5',
		},
		headers: {
			'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
			'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await axios.request(options);
		return response.data as SearchData;
	} catch (error) {
		console.error(error);
		throw createError({
			statusCode: 500,
			message: 'Failed to fetch search results',
		});
	}
});
