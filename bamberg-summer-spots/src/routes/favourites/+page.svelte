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
	<div class="empty-state">

		<h2>No favourite locations yet</h2>

		<p>
			Start exploring Bamberg and click the heart icon to save your favourite places.
		</p>

		<a href="/" class="empty-button">
			Explore locations
		</a>
	</div>
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

	.empty-state {
	max-width: 500px;
	margin: 5rem auto;
	padding: 3rem;
	text-align: center;

	background: white;
	border-radius: 24px;
	box-shadow: 0 12px 30px rgba(0,0,0,.08);
	}

	.empty-state h2 {
		margin-bottom: .75rem;
	}

	.empty-state p {
		color: #666;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.empty-button {
		display: inline-block;
		padding: .8rem 1.6rem;
		background: #5ba94d;
		color: white;
		border-radius: 999px;
		text-decoration: none;
		font-weight: 600;
	}

@media (max-width: 768px) {

    .empty-state {
        margin: 2rem 1rem;
        padding: 2rem 1.5rem;
        border-radius: 20px;
    }

    .empty-state h2 {
        font-size: 2rem;
        line-height: 1.2;
    }

    .empty-state p {
        font-size: 1rem;
        line-height: 1.6;
        margin: 1rem 0 2rem;
    }


    .empty-button {
        width: 220px;
    }
}
</style>