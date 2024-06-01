export interface FullTrackInfo {
	id: string;
	name: string;
	duration_ms: number;
	is_playable: boolean;
	artists: {
		id: string;
		name: string;
		uri: string;
		external_urls: {
			spotify: string;
		};
	}[];
	album: {
		id: string;
		name: string;
		images: {
			url: string;
			height: number;
			width: number;
		}[];
		uri: string;
		album_type: string;
		artists: {
			id: string;
			name: string;
			uri: string;
			external_urls: {
				spotify: string;
			};
		}[];
	};
	external_ids: {
		isrc: string;
	};
	external_urls: {
		spotify: string;
	};
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	explicit: boolean;
	is_local: boolean;
	disc_number: number;
	isrc: string;
}
