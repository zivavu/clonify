<script setup lang="ts">
import type { SimplifiedArtist } from '@spotify/web-api-ts-sdk';

const props = defineProps<{
	artist: SimplifiedArtist;
}>();
</script>

<template>
	<NuxtLink
		class="hover:underline"
		:to="{
			name: 'artist-id',
			params: { id: encodeURIComponent(props.artist?.id) },
		}">
		<p class="text-muted-foreground">{{ props.artist.name }}<slot /></p>
	</NuxtLink>
</template>
