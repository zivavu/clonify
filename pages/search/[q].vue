<script setup lang="ts">
import {
	type PartialSearchResult,
	type SimplifiedPlaylist,
} from '@spotify/web-api-ts-sdk';
import Artists from '~/components/Artists.vue';
import MediaList from '~/components/MediaList.vue';
import TopResult from '~/components/TopResult.vue';
import Tracks from '~/components/Tracks.vue';

const results = await $fetch<PartialSearchResult>(
	`/api/search?q=${useRoute().params.q}`
);
</script>

<template>
	<div class="flex flex-wrap gap-2 p-4 space">
		<div class="w-full">
			<div class="flex flex-row flex-wrap w-full space-x-4 xl:flex-nowrap">
				<TopResult
					v-if="results?.tracks?.items?.length"
					:top-result="results?.tracks?.items[0]" />
				<Tracks
					v-if="results?.tracks?.items"
					:tracks="results?.tracks?.items.slice(0, 4)"
					title="Tracks"
					:context-uri="results?.tracks?.items[0]?.album?.uri" />
			</div>
			<Artists
				v-if="results?.artists?.items"
				:artists="results?.artists?.items"
				class="min-w-full" />
			<MediaList
				v-if="results?.albums?.items"
				:items="results?.albums?.items"
				class="min-w-full" />
			<MediaList
				v-if="results?.playlists"
				:items="results?.playlists?.items as SimplifiedPlaylist[]"
				class="min-w-full" />
		</div>
	</div>
</template>
