<script setup lang="ts">
import type { Artist } from '@spotify/web-api-ts-sdk';
import { defineProps } from 'vue';
import ProfileList from '~/components/ProfileList.vue';

const { artists } = defineProps<{ artists: Artist[] }>();
</script>

<template>
	<ProfileList :items="artists" title="Artists" type="artist" />
</template>
