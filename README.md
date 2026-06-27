# Bamberg Summer Spots

Bamberg Summer Spots is a web application that helps users discover beautiful places to visit in Bamberg during the summer. The application allows users to browse locations, view them on an interactive map, save favourites, and leave comments on individual places.

## Features

- Browse popular summer locations in Bamberg
- Search locations by name, description, or category
- Filter locations by category
- Interactive map with custom popups
- Mark locations as favourites
- Detailed page for each location
- Comment section for every location
- Current weather in Bamberg using the Open-Meteo API
- Responsive design for desktop and mobile devices

## Technologies

- SvelteKit
- Svelte 5
- Leaflet
- OpenStreetMap
- Open-Meteo API
- HTML
- CSS
- JavaScript

## Project Structure

```
src/
 ├── lib/
 │   ├── components/
 │   ├── data/
 │   ├── stores/
 │   └── images/
 ├── routes/
 │   ├── +page.svelte
 │   ├── favourites/
 │   ├── map/
 │   └── locations/
 └── app.html

static/
 └── images/
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev -- --host
```

Open the application in your browser:

```
http://localhost:5173/
```

Open the application on your phone:

```
http://192.168.178.36:5173/
```

## Data

The application uses a static dataset of locations stored in the project. Weather information is fetched live from the Open-Meteo API.

