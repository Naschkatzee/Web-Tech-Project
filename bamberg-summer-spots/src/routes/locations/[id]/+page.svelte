<script>
	import { page } from '$app/state';
	import { locations } from '$lib/data/locations.js';
    

	const location = locations.find(
		(item) => item.id === Number(page.params.id)
	);
</script>

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