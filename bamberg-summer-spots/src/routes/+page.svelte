<!-- This file defines the home page -->


<script>
	import { locations } from '$lib/data/locations.js';
	//imports the complete list of locations from data file
    import LocationCard from '$lib/components/LocationCard.svelte';
	//imports the reusable card component that displays location details
    import { favorites } from '$lib/stores/favourites.js';
	//imports the favourites store, which holds the IDs of the user's favourite locations
	import Weather from '$lib/components/Weather.svelte';
	//imports the Weather component, which displays the current weather in Bamberg

	let searchTerm = $state('');
	//creates a reactive state variable.
	//initially the search field is empty, as the user types into the search box, variable automatically updates

    let filteredLocations = $derived(
        locations.filter((location) => {
            const matchesSearch =
                location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.category.toLowerCase().includes(searchTerm.toLowerCase());

		    const matchesCategory =
                selectedCategory === 'All' ||
                location.category === selectedCategory;

		    return matchesSearch && matchesCategory;
	    })
    );

    const categories = [
	'All',
	'Nature',
	'Viewpoint',
	'Park',
	'Garden',
	'Historic',
	'City Spot',
	'Café',
    ];

    let selectedCategory = $state('All');
	//creates another reactive state variable.
	//initially set to 'All', which means no category filter is applied.
</script>

<h1>Bamberg Summer Spots</h1>

<p class="subtitle">
	Discover beautiful places in Bamberg for relaxing, walking and enjoying summer.
</p>

<!-- renders the Weather component -->
<div class="weather-wrapper">
	<Weather />
</div>

<div class="search-container">
	<input
		type="text"
		bind:value={searchTerm}
		placeholder="Search for parks, cafés, viewpoints..."
	/>
</div>

<!-- 2 filters: search term and category. Whenever the user types in the search box or clicks a category button, 
 the list of displayed locations automatically updates to match the new filters. -->

<div class="filters">
	{#each categories as category}
		<button
			class:active={selectedCategory === category}
			onclick={() => (selectedCategory = category)}
		>
			{category}
		</button>
	{/each}
</div>

<!-- container for the location cards. It uses Svelte's each block to loop through the filteredLocations array 
 and render a LocationCard for each location that matches the current search term and selected category. -->
 <div class="locations-grid">
	{#each filteredLocations as location}
	<LocationCard {location} />
    {/each}
</div>

<style>
	h1 {
		text-align: center;
		margin-top: 2rem;
	}

	.subtitle {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	.weather-wrapper {
	position: absolute;
	top: 80px;
	right: 40px;
	width: 250px;
	}

	.locations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 2rem;
		justify-content: center;
	}

    .search-container {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }

    input {
        width: min(500px, 90%);
        padding: 0.9rem 1rem;
        border: 1px solid #ddd;
        border-radius: 999px;
        font-size: 1rem;
    }

    .filters {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem;
        margin-bottom: 2rem;
    }

    .filters button {
        padding: 0.6rem 1rem;
        border: none;   
        border-radius: 999px;
        cursor: pointer;
        background: #f2f2f2;
    }

    .filters button.active {
        background: #4caf50;
        color: white;
    }

@media (max-width: 768px) {
	.weather-wrapper {
		position: static;
		width: 90%;
		max-width: 320px;
		margin: 1rem auto 2rem;
	}

	h1 {
		font-size: 2rem;
		line-height: 1.2;
		margin-top: 2rem;
		text-align: center;
	}

	.subtitle {
		font-size: 1rem;
		padding: 0 1rem;
		text-align: center;
	}

	.locations-grid {
		grid-template-columns: 1fr;
		padding: 1rem;
	}

	.search-container {
		padding: 0 1rem;
	}

	input {
		width: 100%;
	}

	.filters {
		padding: 0 1rem;
	}
}

    
</style>