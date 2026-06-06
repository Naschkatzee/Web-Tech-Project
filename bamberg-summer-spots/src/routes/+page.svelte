<script>
	import { locations } from '$lib/data/locations.js';
    import { goto } from '$app/navigation';
    import LocationCard from '$lib/components/LocationCard.svelte';
    import { favorites } from '$lib/stores/favourites.js';

	let searchTerm = $state('');

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
</script>

<h1>Bamberg Summer Spots</h1>

<p class="subtitle">
	Discover beautiful places in Bamberg for relaxing, walking and enjoying summer.
</p>

<div class="search-container">
	<input
		type="text"
		bind:value={searchTerm}
		placeholder="Search for parks, cafés, viewpoints..."
	/>
</div>

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

	.locations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 2rem;
	}

	.card {
		background: white;
		padding: 1.5rem;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		transition: transform 0.2s;
        cursor: pointer;
	}

	.card:hover {
		transform: translateY(-4px);
	}

	.category {
		display: inline-block;
		background: #e8f5e9;
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		margin-top: 1rem;
		font-size: 0.9rem;
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

    
</style>