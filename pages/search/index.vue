<script setup lang="ts">
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
</script>

<template>
	<div>
		<h1>Search Results</h1>

		<div v-if="searchStore.results" class="search-results">
			<!-- Najlepszy wynik -->
			<div
				v-if="searchStore.results.topResults.items.length"
				class="p-4 mb-4 border rounded shadow top-result">
				<h2 class="text-lg font-bold">Top Result</h2>
				<div class="flex items-center space-x-4">
					<img
						:src="
							searchStore.results.topResults.items[0].data.albumOfTrack.coverArt
								.sources[0].url
						"
						alt=""
						class="w-16 h-16 rounded" />
					<div>
						<h3 class="text-xl font-semibold">
							{{ searchStore.results.topResults.items[0].data.name }}
						</h3>
						<p>
							{{
								searchStore.results.topResults.items[0].data.artists.items[0]
									.profile.name
							}}
						</p>
					</div>
				</div>
			</div>

			<!-- Utwory -->
			<div
				v-if="searchStore.results.tracks.items.length"
				class="p-4 mb-4 border rounded shadow tracks">
				<h2 class="text-lg font-bold">Tracks</h2>
				<ul>
					<li
						v-for="(track, index) in searchStore.results.tracks.items.slice(
							0,
							4
						)"
						:key="index"
						class="p-2 border-b">
						{{ track.data.name }} -
						{{ track.data.artists.items[0].profile.name }}
					</li>
				</ul>
			</div>

			<!-- Wykonawcy -->
			<div
				v-if="searchStore.results.artists.items.length"
				class="p-4 mb-4 border rounded shadow artists">
				<h2 class="text-lg font-bold">Artists</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(artist, index) in searchStore.results.artists.items.slice(
							0,
							10
						)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="artist.data.visuals.avatarImage.sources[0].url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ artist.data.profile.name }}</p>
					</div>
				</div>
			</div>

			<!-- Albumy -->
			<div
				v-if="searchStore.results.albums.items.length"
				class="p-4 mb-4 border rounded shadow albums">
				<h2 class="text-lg font-bold">Albums</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(album, index) in searchStore.results.albums.items.slice(
							0,
							10
						)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="album.data.coverArt.sources[0].url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ album.data.name }}</p>
					</div>
				</div>
			</div>

			<!-- Playlisty -->
			<div
				v-if="searchStore.results.playlists.items.length"
				class="p-4 mb-4 border rounded shadow playlists">
				<h2 class="text-lg font-bold">Playlists</h2>
				<div class="grid grid-cols-2 gap-4">
					<div
						v-for="(
							playlist, index
						) in searchStore.results.playlists.items.slice(0, 10)"
						:key="index"
						class="flex items-center space-x-4">
						<img
							:src="playlist.data.images.items[0].sources[0].url"
							alt=""
							class="w-12 h-12 rounded" />
						<p>{{ playlist.data.name }}</p>
					</div>
				</div>
			</div>

			<!-- Może dodanie zbiorczych sekcji na Podcasty, Odcinki, Profile, Gatunki będzie w przyszłości -->
		</div>

		<div v-else>No results found.</div>
	</div>
</template>
