// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'shadcn-nuxt'],
	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},
	vue: {
		propsDestructure: true,
	},
});
