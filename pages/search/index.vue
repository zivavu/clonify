<script setup lang="ts">
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const storeData = searchStore?.getResults;

watchEffect(() => console.log(searchStore.results));
</script>

<template>
	<div>
		<h1>Search Results</h1>

		<div v-if="storeData" class="search-results">
			<!-- Najlepszy wynik -->
			<div
				v-if="storeData?.topResults?.items?.length"
				class="p-4 mb-4 border rounded shadow top-result">
				<h2 class="text-lg font-bold">Top Result</h2>
				<div class="flex items-center space-x-4">
					<img
						:src="
							storeData.topResults.items[0]?.data?.albumOfTrack?.coverArt
								?.sources[0]?.url
						"
						alt=""
						class="w-16 h-16 rounded" />
					<div>
						<h3 class="text-xl font-semibold">
							{{ storeData.topResults.items[0]?.data?.name }}
						</h3>
						<p>
							{{
								storeData.topResults.items[0]?.data?.artists?.items[0]?.profile
									?.name
							}}
						</p>
					</div>
				</div>
			</div>

			<!-- Utwory -->
			<div
				v-if="storeData?.tracks?.items?.length"
				class="p-4 mb-4 border rounded shadow tracks">
				<h2 class="text-lg font-bold">Tracks</h2>
				<ul>
					<li
						v-for="(track, index) in storeData.tracks.items.slice(0, 4)"
						:key="index"
						class="p-2 border-b">
						{{ track?.data?.name }} -
						{{ track?.data?.artists?.items[0]?.profile?.name }}
					</li>
				</ul>
			</div>

			<!-- Wykonawcy -->
			<div
				v-if="storeData?.artists?.items?.length"
				class="p-4 mb-4 border rounded shadow artists">
				<h2 class="text-lg font-bold">Artists</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(artist, index) in storeData.artists.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="artist?.data?.visuals?.avatarImage?.sources[0]?.url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ artist?.data?.profile?.name }}</p>
					</div>
				</div>
			</div>

			<!-- Albumy -->
			<div
				v-if="storeData?.albums?.items?.length"
				class="p-4 mb-4 border rounded shadow albums">
				<h2 class="text-lg font-bold">Albums</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(album, index) in storeData.albums.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="album?.data?.coverArt?.sources[0]?.url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ album?.data?.name }}</p>
					</div>
				</div>
			</div>

			<!-- Playlisty -->
			<div
				v-if="storeData?.playlists?.items?.length"
				class="p-4 mb-4 border rounded shadow playlists">
				<h2 class="text-lg font-bold">Playlists</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(playlist, index) in storeData.playlists.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="playlist?.data?.images?.items[0]?.sources[0]?.url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ playlist?.data?.name }}</p>
					</div>
				</div>
			</div>

			<!-- Podcasty -->
			<div
				v-if="storeData?.podcasts?.items?.length"
				class="p-4 mb-4 border rounded shadow podcasts">
				<h2 class="text-lg font-bold">Podcasts</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(podcast, index) in storeData.podcasts.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="podcast?.data?.coverArt?.sources[0]?.url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ podcast?.data?.name }}</p>
					</div>
				</div>
			</div>

			<!-- Odcinki -->
			<div
				v-if="storeData?.episodes?.items?.length"
				class="p-4 mb-4 border rounded shadow episodes">
				<h2 class="text-lg font-bold">Episodes</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(episode, index) in storeData.episodes.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="episode?.data?.coverArt?.sources[0]?.url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ episode?.data?.name }}</p>
					</div>
				</div>
			</div>

			<!-- Profile -->
			<div
				v-if="storeData?.users?.items?.length"
				class="p-4 mb-4 border rounded shadow users">
				<h2 class="text-lg font-bold">Profiles</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(user, index) in storeData.users.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="user?.data?.image?.smallImageUrl"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ user?.data?.displayName }}</p>
					</div>
				</div>
			</div>

			<!-- Gatunki -->
			<div
				v-if="storeData?.genres?.items?.length"
				class="p-4 mb-4 border rounded shadow genres">
				<h2 class="text-lg font-bold">Genres</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(genre, index) in storeData.genres.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="genre?.data?.image?.sources[0]?.url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ genre?.data?.name }}</p>
					</div>
				</div>
			</div>
		</div>

		<div v-else>No results found.</div>
	</div>
</template>
