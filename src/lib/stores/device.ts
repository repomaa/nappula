import { writable } from 'svelte/store';
import type { HomieDevice } from '../types/homie';

function createDeviceStore() {
	const { subscribe, set, update } = writable<HomieDevice | null>(null);

	return {
		subscribe,
		set,
		update,
		updateNode: (nodeId: string, propertyId: string, value: string) => {
			update((device) => {
				if (!device) return null;
				if (device.nodes[nodeId]?.properties[propertyId]) {
					device.nodes[nodeId].properties[propertyId].value = value;
				}
				return { ...device };
			});
		},
		setOnline: (online: boolean) => {
			update((device) => {
				if (!device) return null;
				return { ...device, online };
			});
		},
		clear: () => set(null)
	};
}

export const device = createDeviceStore();
