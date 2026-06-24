<!-- This file defines the layout for all pages.
 Its purpose is to define content that should appear on every page of the application.
 The layout provides the navigation bar, the Leaflet CSS file, a place where individual pages are rendered
 -->

<!-- loads Leaflet's CSS file -->
<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
	/>
</svelte:head>

<!-- Receives the page content that should be displayed inside the layout. -->
<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/favourites">Favourites</a>
	<a href="/map">Map</a>
</nav>

{@render children()}

<style>
	nav {
		display: flex;
		gap: 1rem;
		padding: 1rem 2rem;
		background: white;
		box-shadow: 0 2px 6px rgba(0,0,0,0.05);
		flex-wrap: wrap;
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