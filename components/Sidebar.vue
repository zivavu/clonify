<script setup>
import { Icon } from '@iconify/vue';
import { SIDEBAR_WIDTH } from './consts';

const sidebarItems = [
	{ icon: 'mage:pin', label: 'Pins', link: '/pins' },
	{ icon: 'hugeicons:playlist-02', label: 'Playlists', link: '/playlists' },
	{ icon: 'ph:heart', label: 'Liked songs', link: '/liked-songs' },
	{ icon: 'mage:bookmark', label: 'Saves', link: '/saves' },
	{ icon: 'iconamoon:music-album-light', label: 'Albums', link: '/albums' },
	{ icon: 'mynaui:folder', label: 'Folders', link: '/folders' },
	{
		icon: 'fluent:book-open-microphone-48-regular',
		label: 'Podcasts',
		link: '/podcasts',
	},
	{ icon: 'hugeicons:book-open-01', label: 'Audiobooks', link: '/audiobooks' },
	{ icon: 'iconamoon:music-artist-light', label: 'Artists', link: '/artists' },
];
</script>

<template>
	<div
		class="h-screen text-white rounded-xl bg-foreground"
		:class="`w-${SIDEBAR_WIDTH}`">
		<nav class="flex flex-col gap-6 p-4">
			<NuxtLink
				v-for="(item, index) in sidebarItems"
				:key="index"
				:value="item.label"
				:href="item.link"
				class="flex items-center w-full px-2 text-gray-300 hover:text-gray-100">
				<Icon :icon="item.icon" class="mr-2 text-3xl"></Icon>
				<span>{{ item.label }}</span>
			</NuxtLink>
		</nav>
	</div>
</template>
