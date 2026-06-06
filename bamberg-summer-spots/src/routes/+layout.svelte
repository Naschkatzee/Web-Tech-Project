<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
	/>
</svelte:head>

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
	}

	a {
		text-decoration: none;
		font-weight: bold;
		color: #333;
	}
</style>