import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createFavoritesStore() {
	const initial =
		browser && localStorage.getItem('favorites')
			? JSON.parse(localStorage.getItem('favorites'))
			: [];

	const { subscribe, update } = writable(initial);

	return {
		subscribe,

		toggle(id) {
			update((favorites) => {
				const updated = favorites.includes(id)
					? favorites.filter((fav) => fav !== id)
					: [...favorites, id];

				if (browser) {
					localStorage.setItem(
						'favorites',
						JSON.stringify(updated)
					);
				}

				return updated;
			});
		}
	};
}

export const favorites = createFavoritesStore();