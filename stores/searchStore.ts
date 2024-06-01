import type { PartialSearchResult } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
	state: () => ({
		results: null as PartialSearchResult | null,
	}),
	actions: {
		async performSearch(query: string) {
			console.log('query', query);
			if (!query.trim()) {
				this.clearResults();
				return;
			}

			try {
				const { data, error } = await useFetch<PartialSearchResult>(
					`/api/search?q=${query}`
				);
				console.log(data);
				if (error.value) {
					console.error('Error during search:', error.value);
				} else if (data.value) {
					this.setResults(data.value);
				}
			} catch (error) {
				console.error('Error during search:', error);
			}
		},
		setResults(data: PartialSearchResult) {
			this.results = data;
		},
		clearResults() {
			this.results = null;
		},
	},
	getters: {
		getResults: (state) => state?.results,
	},
});
