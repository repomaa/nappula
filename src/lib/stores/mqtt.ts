import { writable } from 'svelte/store';
import type { MqttConnectionState } from '../types/homie';

function createMqttStore() {
	const { subscribe, set } = writable<{
		state: MqttConnectionState;
		error?: string;
	}>({
		state: 'disconnected'
	});

	return {
		subscribe,
		setState: (state: MqttConnectionState, error?: string) => set({ state, error })
	};
}

export const mqttConnection = createMqttStore();
