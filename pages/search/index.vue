<script setup lang="ts">
import type { Category } from '@spotify/web-api-ts-sdk';

const { data: categories } = await useFetch<Category[]>(`/api/getCategories`);
</script>

<template>
	<div class="p-4">
		<div
			class="grid gap-4"
			style="grid-template-columns: repeat(auto-fill, minmax(170px, 1fr))">
			<NuxtLink
				v-for="category in categories"
				:to="{
					name: 'search-q',
					params: { q: encodeURIComponent(category.name) },
				}"
				:key="category.id"
				class="relative flex flex-col items-center">
				<img
					:src="category.icons[0].url"
					class="w-full rounded-lg aspect-square"
					alt="Category Icon" />
				<p class="absolute text-xl font-bold text-center text-white bottom-2">
					{{ category.name }}
				</p>
			</NuxtLink>
		</div>
	</div>
</template>
