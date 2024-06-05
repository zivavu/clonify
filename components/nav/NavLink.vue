<script setup>
import { Icon } from '@iconify/vue';
import { cn } from '~/lib/utils';

const props = defineProps({
	to: { type: String, required: true },
	icon: { type: String, required: true },
	label: { type: String, required: true },
	showLabel: { type: Boolean, required: false, default: true },
});

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>

<template>
	<NuxtLink
		:to="props.to"
		:class="
			cn([
				'flex items-center p-2.5 space-x-2 transition rounded-xl hover:bg-neutral-800',
				isActive ? 'text-white bg-neutral-800' : 'text-secondary-foreground',
			])
		">
		<Icon :icon="props.icon" class="text-3xl" />
		<span :class="props.showLabel === false ? 'sr-only' : ''">{{
			props.label
		}}</span>
	</NuxtLink>
</template>
