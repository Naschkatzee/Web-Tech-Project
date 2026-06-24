<!-- This file defines the Location Detail Page. -->

<script>
	import { page } from '$app/state';
	//imports SvelteKit's page state.
	//This object contains information about the current URL.
	import { locations } from '$lib/data/locations.js';
	//imports the complete list of locations from the data file.
	import Comments from '$lib/components/Comments.svelte';
    
	//method searches through the array and returns the first matching element.
	//the location whose ID matches the ID from the URL 
	const location = locations.find(
		(item) => item.id === Number(page.params.id)
	);
</script>

<!-- checks whether a location was successfully found. -->
{#if location}
	<h1>{location.name}</h1>

	<p><strong>Category:</strong> {location.category}</p>

	<p>{location.description}</p>

	<h3>Tags</h3>

	<ul>
		{#each location.tags as tag}
			<li>{tag}</li>
		{/each}
	</ul>

	<a href="/">← Back to all locations</a>
{:else}
	<h1>Location not found</h1>
	<a href="/">← Back to homepage</a>
{/if}

<Comments locationId={location.id} />