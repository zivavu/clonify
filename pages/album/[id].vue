<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const trackId = route.params.id;
</script>

<template>
	<div>
		<h1>Track Details</h1>
		<p>URI: {{ trackId }}</p>
	</div>
</template>
