<script>
	import { onMount } from 'svelte';

	let { locationId } = $props();

	let comments = $state([]);
	let name = $state('');
	let text = $state('');

	async function loadComments() {
		const response = await fetch(
			`http://localhost:3001/comments/${locationId}`
		);

		comments = await response.json();
	}

	async function addComment() {
		if (!name.trim() || !text.trim()) return;

		await fetch('http://localhost:3001/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				locationId,
				name,
				text
			})
		});

		name = '';
		text = '';

		await loadComments();
	}

	onMount(loadComments);
</script>

<section class="comments-card">
<div class="comments">
	<h3>Comments</h3>

	<div class="form">
		<input
			bind:value={name}
			placeholder="Your name"
		/>

		<textarea
			bind:value={text}
			placeholder="Write a comment..."
		></textarea>

		<button onclick={addComment}>
			Add comment
		</button>
	</div>

	{#if comments.length === 0}
		<p>No comments yet.</p>
	{:else}
		{#each comments as comment}
			<div class="comment">
				<strong>{comment.name}</strong>
				<p>{comment.text}</p>
			</div>
		{/each}
	{/if}
</div>
</section>

<style>
	.comments {
        margin: 2rem 0;
        max-width: 700px;
        padding: 0 1rem;
    }

	.form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	input,
	textarea {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	button {
		width: fit-content;
		padding: 0.75rem 1rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		background: #4caf50;
		color: white;
	}

	.comment {
		background: #f7f7f7;
		padding: 1rem;
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	.comments-card {
		background: white;
		border-radius: 18px;
		padding: 2rem;
		margin-top: 2rem;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}

	.comments-card h3 {
		margin-top: 0;
		margin-bottom: 1.5rem;
	}

	
</style>