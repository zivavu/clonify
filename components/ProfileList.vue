<script setup lang="ts">
import type { Artist } from '@spotify/web-api-ts-sdk';
import { defineProps, type HTMLAttributes } from 'vue';

type ProfileItem = Artist;

const {
	items,
	title,
	type,
	class: additionalClass,
} = defineProps<{
	items: ProfileItem[];
	title: string;
	type: 'artist' | 'profile';
	class?: HTMLAttributes['class'];
}>();
</script>

<template>
	<div class="w-full space-y-1">
		<h2 class="ml-4 text-2xl font-bold">{{ title }}</h2>

		<div v-if="items?.length" class="p-2">
			<div
				:class="['grid', additionalClass]"
				style="
					grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
					grid-auto-rows: 0;
					grid-template-rows: 1fr;
				">
				<div
					v-for="(item, index) in items"
					:key="index"
					style="overflow-y: hidden">
					<NuxtLink
						:to="{
							name: type === 'artist' ? 'artist-uri' : 'profile-uri',
							params: { uri: encodeURIComponent(item.uri) },
						}"
						class="flex flex-col content-center p-4 space-y-2 rounded-lg hover:bg-neutral-900">
						<img
							v-if="item.images.length"
							:src="item.images[0]?.url"
							alt="Profile Image"
							class="block object-cover w-full rounded-full aspect-square" />
						<p class="w-full truncate">
							{{ item.name }}
						</p>
						<p class="text-sm text-gray-400">
							{{ type === 'artist' ? 'Artist' : 'Profile' }}
						</p>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>
