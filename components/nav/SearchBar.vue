<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from '~/stores/searchStore';
import { debounce } from '~/utils/debounce';

const searchQuery = ref('');
const searchStore = useSearchStore();
const router = useRouter();

const performSearch = debounce(() => {
	searchStore.performSearch(searchQuery.value);
}, 300);
</script>

<template>
	<div class="relative items-center w-full max-w-sm">
		<Input
			v-model="searchQuery"
			@input="performSearch"
			type="text"
			placeholder="Search..."
			@click="() => router.push('/search')" />
	</div>
</template>
