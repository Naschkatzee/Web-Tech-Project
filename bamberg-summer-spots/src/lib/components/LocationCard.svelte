<script>
	import { goto } from '$app/navigation';
	import { favorites } from '$lib/stores/favourites.js';

	let { location } = $props();

	let isFavorite = $derived($favorites.includes(location.id));

	function toggleFavorite(event) {
		event.stopPropagation();
		favorites.toggle(location.id);
	}
</script>

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
</style>