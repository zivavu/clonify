<script setup lang="ts">
import { computed } from 'vue';
import { useDiscoverStore } from '~/stores/discoverStore';

const discoverStore = useDiscoverStore();
const categories = computed(() => discoverStore.categories);

await discoverStore.fetchCategories();
</script>

<template>
	<div class="p-4">
		<h3 class="mb-4 text-2xl font-bold">Discover</h3>
		<div
			class="grid gap-4"
			style="grid-template-columns: repeat(auto-fill, minmax(170px, 1fr))">
			<div
				v-for="category in categories"
				:key="category.id"
				class="relative flex flex-col items-center">
				<img
					:src="category.icons[0].url"
					class="w-full rounded-lg aspect-square"
					alt="Category Icon" />
				<p class="absolute text-xl font-bold text-center text-white bottom-2">
					{{ category.name }}
				</p>
			</div>
		</div>
	</div>
</template>
