<script setup>
import { Icon } from '@iconify/vue';
import { SIDEBAR_WIDTH } from './consts';
import { Input } from './ui/input';

const navLinks = [
	{ icon: 'lucide:library', label: 'My Library', link: '/library' },
	{ icon: 'fluent:home-32-filled', label: 'Home', link: '/home' },
	{ icon: 'solar:star-angle-outline', label: 'Discover', link: '/discover' },
];

const rightLinks = [
	{ icon: 'solar:bell-linear', label: 'Notifications', link: '/notifications' },
	{ icon: 'pepicons-pencil:persons', label: 'Friends', link: '/friends' },
	{ icon: 'clarity:cog-line', label: 'Settings', link: '/settings' },
	{ icon: 'solar:user-circle-linear', label: 'Profile', link: '/profile' },
];
</script>

<template>
	<nav
		class="flex items-center justify-between px-4 py-2 text-white bg-background">
		<div class="flex items-center">
			<NuxtLink
				v-for="(item, index) in navLinks"
				:key="index"
				:to="item.link"
				class="flex items-center px-2 space-x-2 text-gray-300 transition hover:text-gray-100"
				:class="index === 0 ? `w-${SIDEBAR_WIDTH}` : 'mr-20'">
				<Icon :icon="item.icon" class="text-3xl" />
				<span>{{ item.label }}</span>
			</NuxtLink>
			<div class="relative max-w-sm">
				<Input
					id="search"
					type="text"
					placeholder="Search..."
					class="py-6 pl-10 border-none w-80 bg-foreground" />
				<span
					class="absolute inset-y-0 flex items-center justify-center px-2 start-0">
					<Icon icon="ri:search-line" class="text-2xl" />
				</span>
			</div>
		</div>
		<div class="flex space-x-6">
			<NuxtLink
				v-for="(item, index) in rightLinks"
				:key="index"
				:to="item.link"
				class="flex items-center space-x-2 text-gray-300 transition hover:text-gray-100">
				<Icon :icon="item.icon" class="text-3xl" />
			</NuxtLink>
		</div>
	</nav>
</template>
