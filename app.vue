<script setup lang="ts">
import NavBar from './components/nav/NavBar.vue';
import Sidebar from './components/nav/Sidebar.vue';
</script>

<template>
	<div class="relative flex flex-col">
		<NavBar class="sticky top-0 h-16" />
		<div class="flex flex-1">
			<Sidebar class="sticky top-16" />
			<div class="flex-1 overflow-y-auto border rounded-xl">
				<NuxtPage />
			</div>
		</div>
	</div>
</template>
