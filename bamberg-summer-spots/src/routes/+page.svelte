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

<section class="hero">
	<div class="hero-content">
		<h1>Bamberg<br /><span>Summer Spots</span></h1>

		<p class="subtitle">
			Discover the most beautiful places in Bamberg to enjoy the perfect summer days.
		</p>

		
	</div>

	<div class="weather-wrapper">
		<Weather />
	</div>
</section>

<main class="content">
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
</main>

<style>
	.hero {
		position: relative;
		min-height: 380px;
		background:
			linear-gradient(
				90deg,
				rgba(255, 255, 255, 0.9) 0%,
				rgba(255, 255, 255, 0.7) 28%,
				rgba(255, 255, 255, 0.1) 60%
			);
		background-image: url('/images/hero/bamberg-hero7.png');
		background-size: cover;
		background-position: center 45%;
		padding: 4rem;
		display: flex;
		align-items: center;
	}

	.hero-content {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(4px);
		padding: 1.5rem;
		border-radius: 16px;
		position: absolute;
		left: 14rem;
		top: 5rem;
	}

	.hero h1 {
		font-size: 3.3rem;
		line-height: 1;
		margin: 0 0 1rem;
	}

	.hero h1 span {
		color: #3f7f44;
	}

	.subtitle {
		color: #111;
		font-size: 1.1rem;
		line-height: 1.5;
		margin-bottom: 0rem;
		max-width: 360px;
	}

	.weather-wrapper {
		position: absolute;
		right: 4rem;
		top: 7rem;
		width: 260px;
	}

	.content {
		background: white;
		border-radius: 24px 24px 0 0;
		margin-top: -2rem;
		position: relative;
		z-index: 2;
		padding-top: 2rem;
	}

	.search-container {
		display: flex;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	input {
		width: min(900px, 90%);
		padding: 1rem 1.2rem;
		border: 1px solid #ddd;
		border-radius: 999px;
		font-size: 1rem;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
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

	.locations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 350px));
		gap: 1.5rem;
		padding: 1rem 2rem 2rem;
		justify-content: center;
	}

@media (max-width: 768px) {
	.hero {
		min-height: auto;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		background-position: center;
		background: none;
	}

	.hero::before {
		content: '';
		display: block;
		height: 260px;
		background-image: url('/images/hero/bamberg-hero7.png');
		background-size: cover;
		background-position: center;
		order: 1;
	}


	.hero-content {
		position: static;
		order: 2;
		padding: 1.5rem 1rem;
		background: white;
		text-align: center;
		border-radius: 0 0 20px 20px;
		backdrop-filter: none;
	}

	.weather-wrapper {
		position: static;
		order: 3;
		width: calc(100% - 2rem);
		max-width: 360px;
		margin: 1rem auto;
	}

	.content {
		margin-top: 0;
		border-radius: 20px 20px 0 0;
		padding-top: 1.5rem;
	}

	.hero h1 {
		font-size: 2.4rem;
		line-height: 1.1;
		margin: 0 0 1rem;
		text-align: center;
	}

	.subtitle {
		font-size: 1rem;
		line-height: 1.5;
		margin: 0;
		text-align: center;
		color: #333;
	}

	.search-container {
		padding: 0 1rem;
	}

	input {
		width: 100%;
		box-sizing: border-box;
	}

	.filters {
		padding: 0 1rem;
	}

	.locations-grid {
		grid-template-columns: 1fr;
		padding: 1rem;
	}
}

    
</style>