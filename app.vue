<script setup lang="ts">
import NavBar from './components/nav/NavBar.vue';
import Sidebar from './components/nav/Sidebar.vue';
import PlayerBar from './components/PlayerBar.vue';

const authStore = useAuthStore();

const isLoggedIn = clientSpotifyApi.getAccessToken();

console.log(isLoggedIn, 'loggedIn');
</script>

<template>
	<div class="relative flex flex-col min-h-screen">
		<NavBar class="sticky top-0 h-16" />
		<div class="flex">
			<Sidebar class="sticky h-full top-16" />
			<div
				class="flex-1 p-4 mb-2 mr-4 overflow-x-hidden overflow-y-auto border rounded-xl">
				<NuxtPage />
			</div>
		</div>
		<PlayerBar class="mt-auto" />
	</div>
</template>
