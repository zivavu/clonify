export interface SearchData {
	albums: {
		totalCount: number;
		items: AlbumItem[];
	};
	artists: {
		totalCount: number;
		items: ArtistItem[];
	};
	episodes: {
		totalCount: number;
		items: EpisodeItem[];
	};
	genres: {
		totalCount: number;
		items: GenreItem[];
	};
	playlists: {
		totalCount: number;
		items: PlaylistItem[];
	};
	podcasts: {
		totalCount: number;
		items: PodcastItem[];
	};
	topResults: {
		items: TopResultItem[];
		featured: FeaturedItem[];
	};
	tracks: {
		totalCount: number;
		items: TrackItem[];
	};
	users: {
		totalCount: number;
		items: UserItem[];
	};
}

interface AlbumItem {
	data: {
		uri: string;
		name: string;
		artists: {
			items: {
				uri: string;
				profile: {
					name: string;
				};
			}[];
		};
		coverArt: {
			sources: {
				url: string;
				width: number;
				height: number;
			}[];
		};
		date: {
			year: number;
		};
	};
}

interface ArtistItem {
	data: {
		uri: string;
		profile: {
			name: string;
		};
		visuals: {
			avatarImage: {
				sources: {
					url: string;
					width: number;
					height: number;
				}[];
			};
		};
	};
}

interface EpisodeItem {
	data: {
		uri: string;
		name: string;
		coverArt: {
			sources: ImageSource[];
		};
		duration: {
			totalMilliseconds: number;
		};
		releaseDate: {
			isoString: string;
		};
		podcast: {
			coverArt: {
				sources: ImageSource[];
			};
		};
		description: string;
		contentRating: {
			label: string;
		};
	};
}

interface GenreItem {
	data: {
		uri: string;
		name: string;
		image: {
			sources: ImageSource[];
		};
	};
}

interface PlaylistItem {
	data: {
		uri: string;
		name: string;
		description: string;
		images: {
			items: {
				sources: ImageSource[];
			}[];
		};
		owner: {
			name: string;
		};
	};
}

interface PodcastItem {
	data: {
		uri: string;
		name: string;
		coverArt: {
			sources: ImageSource[];
		};
		type: string;
		publisher: {
			name: string;
		};
		mediaType: string;
	};
}

interface TopResultItem {
	data: {
		uri: string;
		id: string;
		name: string;
		albumOfTrack: AlbumOfTrack;
		artists: {
			items: {
				uri: string;
				profile: {
					name: string;
				};
			}[];
		};
		contentRating: {
			label: string;
		};
		duration: {
			totalMilliseconds: number;
		};
		playability: {
			playable: boolean;
		};
	};
}

interface FeaturedItem {
	data: {
		uri: string;
		name: string;
		description: string;
		images: {
			items: {
				sources: ImageSource[];
			}[];
		};
		owner: {
			name: string;
		};
	};
}

interface TrackItem {
	data: {
		uri: string;
		id: string;
		name: string;
		albumOfTrack: AlbumOfTrack;
		artists: {
			items: {
				uri: string;
				profile: {
					name: string;
				};
			}[];
		};
		contentRating: {
			label: string;
		};
		duration: {
			totalMilliseconds: number;
		};
		playability: {
			playable: boolean;
		};
	};
}

interface UserItem {
	data: {
		uri: string;
		id: string;
		displayName: string;
		username: string;
		image: {
			smallImageUrl: string;
			largeImageUrl: string;
		};
	};
}

interface AlbumOfTrack {
	uri: string;
	name: string;
	coverArt: {
		sources: ImageSource[];
	};
	id: string;
	sharingInfo: {
		shareUrl: string;
	};
}

interface ImageSource {
	url: string;
	width: number | null; // Some widths are null in the example
	height: number | null; // Some heights are null in the example
}
