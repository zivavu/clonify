<script setup>
import NavLink from './NavLink.vue';
import SearchBar from './SearchBar.vue';

const navLinks = [
	{ icon: 'lucide:library', label: 'My Library', link: '/library' },
	{ icon: 'fluent:home-32-filled', label: 'Home', link: '/' },
	{ icon: 'solar:star-angle-outline', label: 'Discover', link: '/discover' },
];

const rightLinks = [
	{ icon: 'solar:bell-linear', label: 'Notifications', link: '/notifications' },
	{ icon: 'pepicons-pencil:persons', label: 'Friends', link: '/friends' },
	{ icon: 'clarity:cog-line', label: 'Settings', link: '/settings' },
	{ icon: 'solar:user-circle-linear', label: 'Profile', link: '/profile' },
];

function loginWithSpotify() {
	window.location.href = '/api/auth/login';
}
</script>

<template>
	<nav
		class="z-50 flex items-center justify-between px-4 py-2 text-white bg-background">
		<div class="flex items-center gap-2">
			<NavLink
				v-for="(item, index) in navLinks"
				:key="index"
				:to="item.link"
				:icon="item.icon"
				:label="item.label"
				:class="index === 0 ? `w-64 mr-8` : 'pl-6 pr-20'" />
			<div class="relative max-w-sm">
				<SearchBar />
			</div>
		</div>
		<div class="flex space-x-0 lg:space-x-4">
			<NavLink
				v-for="(item, index) in rightLinks"
				:showLabel="false"
				:key="index"
				:to="item.link"
				:icon="item.icon"
				:label="item.label" />
		</div>
		<button
			@click="loginWithSpotify"
			class="p-2 text-white bg-green-500 rounded">
			Login with Spotify
		</button>
	</nav>
</template>
