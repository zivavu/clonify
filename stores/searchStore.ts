import { defineStore } from 'pinia';
import type { SearchData } from '~/types/search';

export const useSearchStore = defineStore('search', {
	state: () => ({
		results: null as SearchData | null,
	}),
	actions: {
		setResults(data: SearchData) {
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
