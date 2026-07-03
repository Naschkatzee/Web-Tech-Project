/*This file creates and manages the favorites store. Its purpose is to keep track of which locations the user has marked as 
favourites and to save them in the browser's Local Storage so they remain available after a page refresh.*/

import { writable } from 'svelte/store';
import { browser } from '$app/environment';


//This function creates and configures the store.
function createFavoritesStore() {
	const initial =
		browser && localStorage.getItem('favorites')
			? JSON.parse(localStorage.getItem('favorites'))
			//converts the text into a JS array
			: [];

	const { subscribe, update } = writable(initial);

	return {
		subscribe,
		//This exposes subscribe() to the outside world.
		//Any component importing the store can now reactively access its contents.


		//This function adds or removes a favourite.
		toggle(id) {
			update((favorites) => {
				const updated = favorites.includes(id)
					? favorites.filter((fav) => fav !== id)
					: [...favorites, id];

				//ensures Local Storage is only accessed inside the browser
				//saves the updated favourites list
				if (browser) {
					localStorage.setItem(
						'favorites',
						JSON.stringify(updated)
						//converts a JavaScript array into text.
					);
				}

				return updated;
			});
		}
	};
}

export const favorites = createFavoritesStore();
//creates the store and exports it, any component can now import it