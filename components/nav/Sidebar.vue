<script setup>
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
	<div class="h-screen text-white rounded-xl bg-background w-72">
		<nav class="flex flex-col gap-6 p-4">
			<NavLink
				v-for="(item, index) in sidebarItems"
				:key="index"
				:to="item.link"
				:icon="item.icon"
				:label="item.label" />
		</nav>
	</div>
</template>
