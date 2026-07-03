<!-- LocationCard.svelte
 The purpose of this component is to display information about a single location and 
 allow the user to either navigate to its detail page or add/remove it from their favourites.
+page.svelte creates the cards. LocationCard.svelte receives the data.
    
 Here goes JS logic for the component, such as handling clicks, managing state, etc.
-->
<script>
	import { goto } from '$app/navigation'; 
	import { favorites } from '$lib/stores/favourites.js';
	

	let { location } = $props();
	let isFavorite = $derived($favorites.includes(location.id));


	//This function runs when the user clicks the heart icon. 
	// It toggles the favourite status of the location by adding or removing its ID from the favourites store.
	function toggleFavorite(event) {
		event.stopPropagation();
		favorites.toggle(location.id);
	}
</script>

<!--  
Farther is HTML markup that defines what the user actually sees on the screen.
The class name card connects this element to the CSS styling below.
-->

<div
	class="card"
	role="button"
	tabindex="0"
	onclick={() => goto(`/locations/${location.id}`)}
	onkeydown={(event) => {
		if (event.key === 'Enter') {
			goto(`/locations/${location.id}`);
		}
	}}
>
{#if location.image}
	<img
		src={location.image}
		alt={location.name}
		class="location-image"
	/>
{/if}

<div class="card-header">
	<h2>{location.name}</h2>

<button
	class="favorite"
	type="button"
	onclick={toggleFavorite}
>
	{isFavorite ? '❤️' : '🤍'}
</button>
</div>

	<p>{location.description}</p>

	<span class="category">
		{location.category}
	</span>
</div>

<style>
	.card {
		box-sizing: border-box;
		cursor: pointer;
		border: none;
		width: 100%;
		text-align: left;
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		transition: transform 0.2s;
	}

	.card:hover {
		transform: translateY(-4px);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.favorite {
        border: none;
        background: transparent;
        font-size: 1.5rem;
        cursor: pointer;
    }

	.category {
		display: inline-block;
		background: #e8f5e9;
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		margin-top: 1rem;
		font-size: 0.9rem;
	}

	.location-image {
		width: calc(100% + 3rem);
		height: 200px;
		object-fit: cover;
		display: block;
		margin: -1.5rem -1.5rem 1rem;
		border-radius: 12px 12px 0 0;
	}

@media (max-width: 768px) {
	.card {
		padding: 1.25rem;
		max-width: 100%;
	}

	.card-header {
		align-items: flex-start;
	}
}
</style>