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
</script>


<!-- HTML markup for the weather card.  
This creates the container that holds the weather information. -->
<div class="weather-card">
	<h3>Current Weather in Bamberg</h3>
	<!-- Svelte's conditional rendering: -->
	{#if loading}
		<p>Loading weather...</p>
	{:else if error}
		<p>Unable to load weather data.</p>
	{:else}
		<p class="temp">{weather.temperature}°C</p>
		<p>{weatherText(weather.code)}</p>
	{/if}
</div>

<style>
	.weather-card {
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .weather-card h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }

    .temp {
        font-size: 1.5rem;
        margin: 0.25rem 0;
    }

	.temp {
		font-size: 2rem;
		font-weight: bold;
		margin: 0.5rem 0;
	}
</style>