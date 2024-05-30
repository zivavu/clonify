<template>
	<div class="flex flex-col h-screen">
		<NavBar />
		<div class="flex flex-1">
			<Sidebar />
			<div class="flex-1 overflow-y-auto">
				<NuxtPage />
			</div>
		</div>
	</div>
</template>
