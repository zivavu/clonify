import type { Category } from '@spotify/web-api-ts-sdk';
import { defineStore } from 'pinia';

export const useDiscoverStore = defineStore('discover', {
	state: () => ({
		categories: null as Category[] | null,
	}),

	actions: {
		async fetchCategories() {
			try {
				const data = await $fetch(`/api/getCategories`);

				this.categories = data.categories.items;
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		},
	},
});
