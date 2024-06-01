<script setup lang="ts">
import { NuxtLink } from '#components';
import { defineProps } from 'vue';

const props = defineProps({
	to: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<NuxtLink :to="to" class="p-2 rounded hover:bg-neutral-800">
		<slot />
	</NuxtLink>
</template>

<style scoped>
.p-2 {
	padding: 0.5rem;
}
.rounded {
	border-radius: 0.375rem;
}
</style>
