import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { ConnectionCredentials } from '../types/homie';

const STORAGE_KEY = 'homie_credentials';

function createAuthStore() {
	const stored = browser ? localStorage.getItem(STORAGE_KEY) : null;
	const initial: ConnectionCredentials | null = stored ? JSON.parse(stored) : null;

	const { subscribe, set } = writable<ConnectionCredentials | null>(initial);

	return {
		subscribe,
		save: (credentials: ConnectionCredentials) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
			}
			set(credentials);
		},
		clear: () => {
			if (browser) {
				localStorage.removeItem(STORAGE_KEY);
			}
			set(null);
		}
	};
}

export const auth = createAuthStore();
