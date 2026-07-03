<!-- This file defines the layout for all pages.
 Its purpose is to define content that should appear on every page of the application.
 The layout provides the navigation bar, the Leaflet CSS file, a place where individual pages are rendered
 -->

 
<!-- loads Leaflet's CSS file -->
<script>
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
	/>
</svelte:head>

<!-- Receives the page content that should be displayed inside the layout. -->

<nav>
	<a href="/" class:active={page.url.pathname === '/'}>Home</a>

	<a
		href="/favourites"
		class:active={page.url.pathname === '/favourites'}
	>
		Favourites
	</a>

	<a
		href="/map"
		class:active={page.url.pathname === '/map'}
	>
		Map
	</a>
</nav>

{@render children()}

<style>
	nav {
		display: flex;
		gap: 0.75rem;
		padding: 1rem 2rem;
		align-items: center;
		background: white;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
	}

	nav a {
		text-decoration: none;
		color: #333;
		font-weight: 600;
		padding: 0.6rem 1.2rem;
		border-radius: 999px;
		transition: background-color 0.2s ease, color 0.2s ease;
	}

	nav a:hover {
		background: #f3f3f3;
	}

	nav a.active {
		background: #4caf50;
		color: white;
	}

@media (max-width: 600px) {
	nav {
		justify-content: center;
		padding: 1rem;
	}
}

	a {
		text-decoration: none;
		font-weight: bold;
		color: #333;
	}
</style>