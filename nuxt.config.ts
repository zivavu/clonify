import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
	css: ['~/assets/css/tailwind.css'],
});
