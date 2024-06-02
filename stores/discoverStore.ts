import type { Category } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const useDiscoverStore = defineStore('discover', {
	state: () => ({
		categories: null as Category[] | null,
	}),
	actions: {
		async fetchCategories() {
			try {
				const { data, error } = await useFetch(`/api/discover`);
				if (error.value) {
					console.error('Error fetching categories:', error.value);
				} else if (data.value) {
					this.categories = data.value.categories.items;
				}
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		},
	},
});
