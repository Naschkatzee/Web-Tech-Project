<!-- This file defines the Map Page. 
 Uses Leaflet - JS library used to create interactive maps on websites.-->

<script>
	import { onMount } from 'svelte';
	//because Leaflet should only be loaded in the browser after the page has appeared. 
	//Leaflet uses browser features like window, so importing it too early can cause errors in SvelteKit.
	import { locations } from '$lib/data/locations.js';
	import { favorites } from '$lib/stores/favourites.js';

	let mapContainer;
	//refers to the HTML element where the map should appear
	let map;
	//stores the actual Leaflet map object
	let L;
	//stores the imported Leaflet library.
	let markerLayer;
	//stores a group of markers
	let showOnlyFavourites = $state(false);
	//reactive state variable (variable that automatically updates the user interface whenever its value changes) 
	//that starts as false, meaning the map shows all locations by default.

	//function for drawing the markers on the map
	function updateMarkers() {
		if (!map || !L || !markerLayer) return;

		markerLayer.clearLayers();
		//to clear before switching between all locations and favourites

		const visibleLocations = showOnlyFavourites
			? locations.filter((location) => $favorites.includes(location.id))
			: locations;

		visibleLocations.forEach((location) => {
			L.marker([location.latitude, location.longitude])
				.addTo(markerLayer)
				.bindPopup(`
					<div class="map-popup">
                        <strong>${location.name}</strong><br>
                        <span>${location.category}</span><br><br>
                        <a href="/locations/${location.id}">
                            Open details →
                        </a>
	                </div>
                    
				`);
		});
	}

	//runs once when the map page is loaded in the browser
	onMount(async () => {
		L = await import('leaflet');

		map = L.map(mapContainer).setView([49.8917, 10.8917], 13);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		markerLayer = L.layerGroup().addTo(map);
		//creates a new layer for the markers and adds them to the map

		updateMarkers();
		//called once so that markers appear when the page first loads.
	});

	//watches reactive values
	//whenever the user switches the map mode or changes favourites, the effect runs again and calls updateMarkers()
	$effect(() => {
		showOnlyFavourites;
		$favorites;
		updateMarkers();
	});
</script>

<h1>Explore Bamberg</h1>

<!-- 2 buttons that allow the user to switch between viewing all locations and only their favourite locations on the map -->
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
<!-- creates the empty container where Leaflet will render the map. -->

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