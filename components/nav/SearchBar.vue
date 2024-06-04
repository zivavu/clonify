<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

import { debounce } from '~/utils/debounce';

const router = useRouter();
const initialQ = router.currentRoute.value.params.q;
const searchQuery = ref(Array.isArray(initialQ) ? initialQ[0] : initialQ);

const performSearch = debounce(() => {
	router.push(`/search/${searchQuery.value.trim()}`);
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
			autocomplete="off"
			@input="performSearch"
			@onfocus="() => !searchQuery.trim() && router.push('/search')" />
		<span
			class="absolute inset-y-0 flex items-center justify-center px-2 start-0">
			<Icon icon="ri:search-line" class="text-2xl" />
		</span>
	</div>
</template>
