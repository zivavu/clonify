import { defineStore } from 'pinia';
import type { SearchData } from '~/types/search';

export const useSearchStore = defineStore('search', {
	state: () => ({
		results: null as SearchData | null,
	}),
	actions: {
		setResults(data: string) {
			console.log(data);
			this.results = JSON.parse(JSON.stringify(data));
		},

		clearResults() {
			this.results = null;
		},
	},
	getters: {
		getResults: (state) => state?.results,
	},
});
