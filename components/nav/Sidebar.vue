<script setup>
import NavLink from './NavLink.vue';

const sidebarItems = [
	{ icon: 'mage:pin', label: 'Pins', link: '/pins' },
	{ icon: 'hugeicons:playlist-02', label: 'Playlists', link: '/playlist' },
	{ icon: 'ph:heart', label: 'Liked songs', link: '/liked-songs' },
	{ icon: 'mage:bookmark', label: 'Saves', link: '/saves' },
	{ icon: 'iconamoon:music-album-light', label: 'Albums', link: '/album' },
	{ icon: 'mynaui:folder', label: 'Folders', link: '/folders' },
	{
		icon: 'fluent:book-open-microphone-48-regular',
		label: 'Podcasts',
		link: '/podcast',
	},
	{ icon: 'hugeicons:book-open-01', label: 'Audiobooks', link: '/audiobook' },
	{ icon: 'iconamoon:music-artist-light', label: 'Artists', link: '/artist' },
];
</script>

<template>
	<div class="text-white rounded-xl bg-background w-72">
		<nav class="flex flex-col gap-4 p-4">
			<NavLink
				v-for="(item, index) in sidebarItems"
				:key="index"
				:to="item.link"
				:icon="item.icon"
				:label="item.label" />
		</nav>
	</div>
</template>
