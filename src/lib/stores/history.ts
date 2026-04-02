import { writable } from 'svelte/store';

export interface HistoryPoint {
	timestamp: number;
	value: number;
}

interface SensorHistory {
	temperature: HistoryPoint[];
	humidity: HistoryPoint[];
	pressure: HistoryPoint[];
}

function createHistoryStore() {
	const { subscribe, set, update } = writable<SensorHistory>({
		temperature: [],
		humidity: [],
		pressure: []
	});

	return {
		subscribe,
		addValue: (type: 'temperature' | 'humidity' | 'pressure', value: number) => {
			update((history) => ({
				...history,
				[type]: [...history[type], { timestamp: Date.now(), value }]
			}));
		},
		clear: () =>
			set({
				temperature: [],
				humidity: [],
				pressure: []
			})
	};
}

export const history = createHistoryStore();
