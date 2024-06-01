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
