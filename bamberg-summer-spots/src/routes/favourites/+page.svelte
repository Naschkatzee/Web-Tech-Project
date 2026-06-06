<script>
	import { locations } from '$lib/data/locations.js';
	import { favorites } from '$lib/stores/favourites.js';
	import LocationCard from '$lib/components/LocationCard.svelte';

	let favouriteLocations = $derived(
		locations.filter((location) =>
			$favorites.includes(location.id)
		)
	);
</script>

<h1>Your Favourite Spots</h1>

{#if favouriteLocations.length > 0}
	<div class="locations-grid">
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
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 2rem;
	}
</style>