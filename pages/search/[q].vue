<script setup lang="ts">
import {
	type PartialSearchResult,
	type SimplifiedPlaylist,
} from '@spotify/web-api-ts-sdk';
import Albums from '~/components/Albums.vue';
import Artists from '~/components/Artists.vue';
import Playlists from '~/components/Playlists.vue';
import TopResult from '~/components/TopResult.vue';
import Track from '~/components/Track.vue';

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
				<div class="w-full space-y-2">
					<h2 class="text-2xl font-bold">Songs</h2>
					<ul>
						<li
							v-for="(track, index) in results?.tracks?.items.slice(1, 5)"
							:key="index">
							<Track :track="track" />
						</li>
					</ul>
				</div>
			</div>
			<Artists
				v-if="results?.artists?.items"
				:artists="results?.artists?.items"
				class="min-w-full" />
			<Albums
				v-if="results?.albums?.items"
				:albums="results?.albums?.items"
				class="min-w-full" />
			<Playlists
				v-if="results?.playlists"
				:playlists="results?.playlists?.items as SimplifiedPlaylist[]"
				class="min-w-full" />
		</div>
	</div>
</template>
