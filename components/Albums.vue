<script setup lang="ts">
import type { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';
import MediaList from '~/components/MediaList.vue';

const { albums } = defineProps<{ albums: SimplifiedAlbum[] }>();
</script>

<template>
	<MediaList :items="albums" title="Albums" />
</template>
