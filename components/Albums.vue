<script setup lang="ts">
import type { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';
import MediaList from '~/components/MediaList.vue';

const props = defineProps<{ albums: SimplifiedAlbum[]; title?: string }>();
</script>

<template>
	<MediaList :items="albums" :title="title ?? 'Albums'" />
</template>
