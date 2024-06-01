import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

const api = SpotifyApi.withClientCredentials(clientId, clientSecret);

export { api };
