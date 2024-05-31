<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/vue';
import { useFetch } from '@vueuse/core';
import { ref, watch } from 'vue';
import { debounce } from '~/utils/debounce';

const searchTerm = ref('');
const searchResults = ref(null);
const router = useRouter();

const performSearch = async (query: string) => {
	if (query.trim()) {
		const { data, error } = await useFetch(`/api/search?q=${query}`);
		if (error.value) {
			console.error('Error during search:', error.value);
		} else {
			console.log(data);
			router.push('/search');
		}
	} else {
		searchResults.value = null;
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
			v-model="searchTerm" />
		<span
			class="absolute inset-y-0 flex items-center justify-center px-2 start-0">
			<Icon icon="ri:search-line" class="text-2xl" />
		</span>
	</div>
</template>
