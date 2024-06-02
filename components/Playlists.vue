<script setup lang="ts">
import type { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';
import MediaList from '~/components/MediaList.vue';

const { playlists } = defineProps<{
	playlists: SimplifiedPlaylist[];
}>();
</script>

<template>
	<MediaList :items="playlists" title="Playlists" />
</template>
