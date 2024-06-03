import type { PartialSearchResult } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
	state: () => ({
		results: null as PartialSearchResult | null,
	}),
	actions: {
		async performSearch(query: string) {
			if (!query.trim()) {
				this.clearResults();
				return;
			}

			try {
				const data = await $fetch<PartialSearchResult>(
					`/api/search?q=${query}`
				);
				this.setResults(data);
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
