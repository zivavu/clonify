<script setup lang="ts">
import NavBar from './components/nav/NavBar.vue';
import Sidebar from './components/nav/Sidebar.vue';

useHead({
	title: 'Cloanify - Spotify Clone',
	bodyAttrs: {
		class: 'dark',
	},
});
</script>

<template>
	<div class="relative flex">
		<Sidebar class="sticky top-0 overflow-y-auto h-svh" />
		<div class="w-full">
			<NavBar class="sticky top-0" />
			<main
				class="flex-1 mb-2 mr-4 overflow-x-hidden overflow-y-auto border rounded-xl">
				<NuxtPage />
			</main>
		</div>
		<!-- <PlayerBar class="mt-auto" /> -->
	</div>
</template>
