<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/vue';
import { useFetch } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '~/stores/searchStore';
import type { SearchData } from '~/types/search';
import { debounce } from '~/utils/debounce';

const searchTerm = ref('');
const router = useRouter();
const searchStore = useSearchStore();

const performSearch = async (query: string) => {
	if (query.trim()) {
		const { data, error } = await useFetch<string>(`/api/search?q=${query}`);
		if (error.value || !data.value) {
			console.error('Error during search:', error.value);
		} else {
			const jsonData = JSON.parse(data.value) as SearchData;
			searchStore.setResults(jsonData);
		}
	} else {
		searchStore.clearResults();
	}
};

const debouncedSearch = debounce((query: string) => {
	performSearch(query);
}, 200);

watch(searchTerm, (newSearchTerm) => {
	debouncedSearch(newSearchTerm);
});
</script>

<template>
	<div class="relative items-center w-full max-w-sm">
		<Input
			id="search"
			type="text"
			placeholder="Search..."
			class="py-6 pl-10 border-none w-80 bg-foreground"
			v-model="searchTerm"
			v-on:click="() => router.push('/search')" />
		<span
			class="absolute inset-y-0 flex items-center justify-center px-2 start-0">
			<Icon icon="ri:search-line" class="text-2xl" />
		</span>
	</div>
</template>
