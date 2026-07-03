<!-- This file defines the Map Page. 
 Uses Leaflet - JS library used to create interactive maps on websites.-->

<script>
	import { onMount } from 'svelte';
	import { locations } from '$lib/data/locations.js';
	import { favorites } from '$lib/stores/favourites.js';

	let mapContainer;
	let map;
	let L;
	let markerLayer;
	let showOnlyFavourites = $state(false);

	//function for drawing the markers on the map
	function updateMarkers() {
		if (!map || !L || !markerLayer) return;

		markerLayer.clearLayers();
		//to clear the layer before switching between all locations and favourites

		const visibleLocations = showOnlyFavourites
			? locations.filter((location) => $favorites.includes(location.id))
			: locations;

		visibleLocations.forEach((location) => {
			L.marker([location.latitude, location.longitude])
				.addTo(markerLayer)
				.bindPopup(`
					<div class="map-popup">

						<img
							src="${location.image}"
							alt="${location.name}"
							class="popup-image"
						/>

						<div class="popup-content">

							<h3>${location.name}</h3>

							<span class="popup-category">
								${location.category}
							</span>

							<p>
								${location.description}
							</p>

							<a
								href="/locations/${location.id}"
								class="popup-button"
							>
								View details →
							</a>

						</div>

					</div>
					`)
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

	:global(.leaflet-popup-content) {
		margin: 0;
		width: 260px !important;
	}

	:global(.leaflet-popup-content-wrapper) {
		padding: 0;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 10px 25px rgba(0,0,0,.2);
	}

	:global(.popup-image) {
		width: 100%;
		height: 140px;
		object-fit: cover;
		display: block;
	}

	:global(.popup-content) {
		padding: 1rem;
	}

	:global(.popup-content h3) {
		margin: 0;
		font-size: 1.2rem;
	}

	:global(.popup-category) {
		display: inline-block;
		margin: .6rem 0;
		padding: .3rem .7rem;
		border-radius: 999px;
		background: #e8f5e9;
		color: #4caf50;
		font-size: .8rem;
		font-weight: 600;
	}

	:global(.popup-content p) {
		font-size: .9rem;
		line-height: 1.5;
		color: #555;
		margin-bottom: 1rem;
	}



@media (max-width: 768px) {

	:global(.leaflet-popup-content) {
		width: 180px !important;
	}

	:global(.popup-image) {
		height: 90px;
	}

	:global(.popup-content) {
		padding: 0.8rem;
	}

	:global(.popup-content h3) {
		font-size: 1rem;
		margin-bottom: 0.4rem;
	}

	:global(.popup-category) {
		display: none;
	}

	:global(.popup-content p) {
		font-size: 0.8rem;
		line-height: 1.35;
		margin-bottom: 0.8rem;
	}

	.map {
		height: 450px;
		width: 95%;
	}

	.map-controls {
		flex-direction: column;
		align-items: center;
	}
}
</style>