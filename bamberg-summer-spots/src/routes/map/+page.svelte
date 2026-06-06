<script>
	import { onMount } from 'svelte';
	import { locations } from '$lib/data/locations.js';
	import { favorites } from '$lib/stores/favourites.js';

	let mapContainer;
	let map;
	let L;
	let markerLayer;
	let showOnlyFavourites = $state(false);

	function updateMarkers() {
		if (!map || !L || !markerLayer) return;

		markerLayer.clearLayers();

		const visibleLocations = showOnlyFavourites
			? locations.filter((location) => $favorites.includes(location.id))
			: locations;

		visibleLocations.forEach((location) => {
			L.marker([location.latitude, location.longitude])
				.addTo(markerLayer)
				.bindPopup(`
					<b>${location.name}</b><br>
					${location.category}
				`);
		});
	}

	onMount(async () => {
		L = await import('leaflet');

		map = L.map(mapContainer).setView([49.8917, 10.8917], 13);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		markerLayer = L.layerGroup().addTo(map);

		updateMarkers();
	});

	$effect(() => {
		showOnlyFavourites;
		$favorites;
		updateMarkers();
	});
</script>

<h1>Explore Bamberg</h1>

<div class="map-controls">
	<button
		class:active={!showOnlyFavourites}
		onclick={() => (showOnlyFavourites = false)}
	>
		All spots
	</button>

	<button
		class:active={showOnlyFavourites}
		onclick={() => (showOnlyFavourites = true)}
	>
		Favourite spots 
	</button>
</div>

<div bind:this={mapContainer} class="map"></div>

<style>
	h1 {
		text-align: center;
		margin: 2rem 0;
	}

	.map-controls {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.map-controls button {
		padding: 0.7rem 1.1rem;
		border: none;
		border-radius: 999px;
		cursor: pointer;
		background: #f2f2f2;
	}

	.map-controls button.active {
		background: #4caf50;
		color: white;
	}

	.map {
		height: 600px;
		width: min(1100px, 95%);
		margin: 0 auto 2rem;
		border-radius: 12px;
	}
</style>