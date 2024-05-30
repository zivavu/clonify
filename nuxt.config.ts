import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
	css: ['~/assets/css/tailwind.css'],

	app: {
		head: {
			title: 'Cloanify',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					name: 'description',
					content: 'Clone of Spotify using Nuxt.js',
					hid: 'description',
				},
				{ name: 'color-scheme', content: 'dark' },
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},
});
