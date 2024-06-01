<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from '~/stores/searchStore';

const searchQuery = ref('');
const searchStore = useSearchStore();

const performSearch = () => {
	searchStore.performSearch(searchQuery.value);
};
</script>

<template>
	<div class="relative items-center w-full max-w-sm">
		<Input
			v-model="searchQuery"
			@input="performSearch"
			type="text"
			placeholder="Search..." />
	</div>
</template>
