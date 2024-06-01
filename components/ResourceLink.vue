<script setup lang="ts">
import { defineProps } from 'vue';
import { NuxtLink } from '#components';

const props = defineProps({
	to: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<NuxtLink :to="to" class="p-2 rounded cursor-pointer hover:bg-gray-100">
		<slot />
	</NuxtLink>
</template>

<style scoped>
.hover\:bg-gray-100:hover {
	background-color: #f7fafc;
}
.cursor-pointer {
	cursor: pointer;
}
.p-2 {
	padding: 0.5rem;
}
.rounded {
	border-radius: 0.375rem;
}
</style>
