<!-- Weather.svelte
To fetch the current weather for Bamberg from the Open-Meteo API and display it on the website
-->

<script>
	import { onMount } from 'svelte';
// Function runs once when the component is added to the page. Use it because we only want to fetch the weather after the component 
// has been rendered in the browser.


	let weather = $state(null);
	//This variable will store the weather data received from the API. Initially it is null because no data has been loaded yet.
	let loading = $state(true);
	//This variable tracks whether the weather request is still running. It starts as true because loading begins immediately.
	let error = $state(false);
	//This variable tracks whether an error occurred while fetching the weather. Initially it is false.


	//When the component appears on the page, execute this asynchronous function (a function that can start a task and then continue 
	//later when that task is finished, instead of making the program wait the whole time).
	onMount(async () => {
		try {
			const response = await fetch(
				'https://api.open-meteo.com/v1/forecast?latitude=49.8917&longitude=10.8917&current=temperature_2m,weather_code'
			);

			const data = await response.json();

			weather = {
				temperature: data.current.temperature_2m,
				code: data.current.weather_code
			};
		} catch (err) {
			error = true;
			console.error(err);
		} finally {
			loading = false;
		}
	});

	function weatherText(code) {
		if (code === 0) return 'Clear sky';
		if ([1, 2, 3].includes(code)) return 'Partly cloudy';
		if ([45, 48].includes(code)) return 'Fog';
		if ([51, 53, 55, 61, 63, 65].includes(code)) return 'Rain';

		return 'Variable weather';
	}

	function weatherIcon(code) {
	if (code === 0) return '☀️';
	if ([1, 2, 3].includes(code)) return '⛅';
	if ([45, 48].includes(code)) return '🌫️';
	if ([51, 53, 55, 61, 63, 65].includes(code)) return '🌧️';

	return '🌤️';
}
</script>


<!-- HTML markup for the weather card.  
This creates the container that holds the weather information. -->
<div class="weather-card">
	<p class="weather-label">Current weather in Bamberg</p>

	{#if loading}
		<p>Loading weather...</p>
	{:else if error}
		<p>Unable to load weather data.</p>
	{:else}
		<div class="weather-main">
			<span class="weather-icon">
				{weatherIcon(weather.code)}
			</span>

			<div>
				<p class="temp">{weather.temperature}°C</p>
				<p class="condition">{weatherText(weather.code)}</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.weather-card {
		background: rgba(255, 255, 255, 0.92);
		padding: 1.2rem;
		border-radius: 16px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(6px);
		box-sizing: border-box;
	}

	.weather-label {
		margin: 0 0 0.8rem;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.weather-main {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.weather-icon {
		font-size: 2.2rem;
	}

	.temp {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
	}

	.condition {
		margin: 0.25rem 0 0;
		font-size: 0.95rem;
	}

@media (max-width: 768px) {
	.weather-card {
		padding: 1rem;
	}

	.weather-main {
		gap: 0.75rem;
	}

	.weather-icon {
		font-size: 2rem;
	}

	.temp {
		font-size: 2rem;
	}

	.weather-label {
		font-size: 1rem;
	}
}
	
</style>