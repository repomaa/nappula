export interface HomieDeviceAttributes {
	mac: string;
	name: string;
	localip: string;
	homie: string;
	fw: {
		name: string;
		version: string;
		checksum: string;
	};
	implementation: {
		name: string;
		version: string;
		config: Record<string, unknown>;
	};
	stats: {
		interval: number;
		signal: number;
		uptime: number;
	};
	state: 'init' | 'ready' | 'disconnected' | 'sleeping' | 'lost' | 'alert';
}

export interface HomieProperty {
	value: string | number | boolean;
	settable?: boolean;
}

export interface HomieNode {
	id: string;
	type: string;
	properties: Record<string, HomieProperty>;
}

export interface HomieDevice {
	id: string;
	online: boolean;
	attributes: HomieDeviceAttributes;
	nodes: Record<string, HomieNode>;
}

export interface ConnectionCredentials {
	host: string;
	username: string;
	password: string;
}

export type MqttConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';
