<script setup lang="ts">
import { Icon } from '@iconify/vue';
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
			id="search"
			type="text"
			placeholder="Search..."
			class="py-6 pl-10 border-none w-80 bg-foreground"
			v-model="searchQuery"
			@input="performSearch"
			@click="() => router.push('/search')" />
		<span
			class="absolute inset-y-0 flex items-center justify-center px-2 start-0">
			<Icon icon="ri:search-line" class="text-2xl" />
		</span>
	</div>
</template>
