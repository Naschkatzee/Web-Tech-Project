<script>
	import { onMount } from 'svelte';

	let weather = $state(null);
	let loading = $state(true);
	let error = $state(false);

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

<div class="weather-card">
	<h3>Current Weather in Bamberg</h3>

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