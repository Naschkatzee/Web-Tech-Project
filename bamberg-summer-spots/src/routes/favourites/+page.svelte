<!-- This file defines the Favourites Page. 
Its purpose is to display only the locations that the user has marked as favourites. -->

<script>
	import { locations } from '$lib/data/locations.js';
	import { favorites } from '$lib/stores/favourites.js';
	import LocationCard from '$lib/components/LocationCard.svelte'; 

	//derived value that is calculated based on the current list of locations and the user's favourites.
	let favouriteLocations = $derived(
		locations.filter((location) =>
			$favorites.includes(location.id)
		)
	);
</script>

<h1>Your Favourite Spots</h1>

{#if favouriteLocations.length > 0}
	<div class="locations-grid">
		<!-- container for the location cards -->
		{#each favouriteLocations as location}
			<LocationCard {location} />
		{/each}
	</div>
{:else}
	<p>You haven't added any favourite locations yet.</p>
{/if}

<style>
	h1 {
		text-align: center;
		margin: 2rem 0;
	}

	.locations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 350px));
		gap: 1.5rem;
		padding: 2rem;
		justify-content: center;
	}
</style>