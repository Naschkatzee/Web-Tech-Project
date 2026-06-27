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

<main class="detail-page">
	<section class="detail-card">
		{#if location.image}
			<img
				src={location.image}
				alt={location.name}
				class="detail-image"
			/>
		{/if}

		<div class="detail-content">
			<h1>{location.name}</h1>

			<span class="category">
				{location.category}
			</span>

			<p class="description">
				{location.description}
			</p>

			<hr />

			<h2>Tags</h2>

			<div class="tags">
				{#each location.tags as tag}
					<span>{tag}</span>
				{/each}
			</div>

			<a href="/" class="back-link">
				← Back to all locations
			</a>
		</div>
	</section>


	<Comments locationId={location.id} />
</main>

<style>
.detail-page {
	max-width: 1100px;
	margin: 2rem auto;
	padding: 0 1rem;
}

.detail-card {
	background: white;
	border-radius: 18px;
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	margin-bottom: 2rem;
}

.detail-image {
	width: 100%;
	height: 420px;
	object-fit: cover;
	display: block;
}

.detail-content {
	padding: 2.5rem;
}

.detail-content h1 {
	font-size: 3rem;
	margin: 0 0 1rem;
}

.category {
	display: inline-block;
	background: #e8f5e9;
	color: #2e7d32;
	padding: 0.5rem 0.9rem;
	border-radius: 999px;
	font-weight: 700;
	margin-bottom: 1.5rem;
}

.description {
	font-size: 1.15rem;
	line-height: 1.7;
	max-width: 800px;
	margin: 1.5rem 0;
	color: #333;
}

hr {
	border: none;
	border-top: 1px solid #eee;
	margin: 2rem 0;
}

.detail-content h2 {
	margin-bottom: 1rem;
}

.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	margin-bottom: 2rem;
}

.tags span {
	background: #f2f7f2;
	color: #2e7d32;
	padding: 0.5rem 0.9rem;
	border-radius: 999px;
	font-weight: 600;
}

.back-link {
	color: #2e7d32;
	font-weight: 700;
	text-decoration: none;
}

.back-link:hover {
	text-decoration: underline;
}

@media (max-width: 768px) {
	.detail-page {
		margin: 1rem auto;
	}

	.detail-image {
		height: 240px;
	}

	.detail-content {
		padding: 1.5rem;
	}

	.detail-content h1 {
		font-size: 2.2rem;
	}
}
</style>