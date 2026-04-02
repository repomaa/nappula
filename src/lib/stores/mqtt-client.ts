import mqtt, { type MqttClient } from 'mqtt';
import { get } from 'svelte/store';
import { auth } from './auth';
import { mqttConnection } from './mqtt';
import { device } from './device';
import { history } from './history';
import type { HomieDevice, HomieDeviceAttributes } from '../types/homie';

const DEVICE_ID = 'nappula';
const HOMIE_PREFIX = 'homie';

let client: MqttClient | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

function parseHomieMessage(topic: string, payload: string): void {
	const parts = topic.split('/');
	if (parts.length < 3 || parts[0] !== HOMIE_PREFIX || parts[1] !== DEVICE_ID) return;

	const deviceTopic = parts.slice(2).join('/');

	device.update((currentDevice) => {
		if (!currentDevice) return null;

		switch (deviceTopic) {
			case '$online':
				return { ...currentDevice, online: payload === 'true' };

			case '$name':
				currentDevice.attributes.name = payload;
				break;
			case '$mac':
				currentDevice.attributes.mac = payload;
				break;
			case '$localip':
				currentDevice.attributes.localip = payload;
				break;
			case '$homie':
				currentDevice.attributes.homie = payload;
				break;
			case '$stats/interval':
				currentDevice.attributes.stats.interval = parseInt(payload);
				break;
			case '$stats/signal':
				currentDevice.attributes.stats.signal = parseInt(payload);
				break;
			case '$stats/uptime':
				currentDevice.attributes.stats.uptime = parseInt(payload);
				break;
			case '$fw/name':
				currentDevice.attributes.fw.name = payload;
				break;
			case '$fw/version':
				currentDevice.attributes.fw.version = payload;
				break;
			case '$fw/checksum':
				currentDevice.attributes.fw.checksum = payload;
				break;
			case '$implementation':
				currentDevice.attributes.implementation.name = payload;
				break;
			case '$implementation/version':
				currentDevice.attributes.implementation.version = payload;
				break;
			case '$implementation/config':
				try {
					currentDevice.attributes.implementation.config = JSON.parse(payload);
				} catch {
					// Ignore JSON parse errors
				}
				break;
			case '$state':
				currentDevice.attributes.state = payload as HomieDeviceAttributes['state'];
				break;
			default: {
				if (deviceTopic.startsWith('$')) break;

				const topicParts = deviceTopic.split('/');
				if (topicParts.length === 1) break;

				const [nodeId, propType, propValue] = topicParts;

				if (propType === '$type') {
					const newNode = {
						id: nodeId,
						type: payload,
						properties: {}
					};
					if (!currentDevice.nodes[nodeId]) {
						currentDevice.nodes[nodeId] = newNode;
					}
					currentDevice.nodes[nodeId].type = payload;
				} else if (propType === '$properties') {
					const props = payload.split(',');
					const newNode = {
						id: nodeId,
						type: '',
						properties: {}
					};
					if (!currentDevice.nodes[nodeId]) {
						currentDevice.nodes[nodeId] = newNode;
					}
					props.forEach((p) => {
						const [pName, pAttrs] = p.split(':');
						if (!currentDevice.nodes[nodeId].properties[pName]) {
							currentDevice.nodes[nodeId].properties[pName] = { value: '' };
						}
						if (pAttrs?.includes('settable')) {
							currentDevice.nodes[nodeId].properties[pName].settable = true;
						}
					});
				} else if (propValue === '$properties') {
					const newNode = {
						id: nodeId,
						type: '',
						properties: {}
					};
					if (!currentDevice.nodes[nodeId]) {
						currentDevice.nodes[nodeId] = newNode;
					}
					const props = payload.split(',');
					props.forEach((p) => {
						const [pName, pAttrs] = p.split(':');
						if (!currentDevice.nodes[nodeId].properties[pName]) {
							currentDevice.nodes[nodeId].properties[pName] = { value: '' };
						}
						if (pAttrs?.includes('settable')) {
							currentDevice.nodes[nodeId].properties[pName].settable = true;
						}
					});
				} else if (propValue === undefined && propType && !propType.startsWith('$')) {
					if (currentDevice.nodes[nodeId]?.properties[propType]) {
						currentDevice.nodes[nodeId].properties[propType].value = payload;
						if (
							(nodeId === 'temperature' || nodeId === 'humidity' || nodeId === 'pressure') &&
							propType === 'value'
						) {
							const numValue = parseFloat(payload);
							if (!isNaN(numValue)) {
								history.addValue(
									nodeId as 'temperature' | 'humidity' | 'pressure',
									nodeId === 'pressure' ? numValue / 100 : numValue
								);
							}
						}
					}
				}
				break;
			}
		}

		return { ...currentDevice };
	});
}

function initializeDevice(): HomieDevice {
	return {
		id: DEVICE_ID,
		online: false,
		attributes: {
			mac: '',
			name: '',
			localip: '',
			homie: '',
			fw: {
				name: '',
				version: '',
				checksum: ''
			},
			implementation: {
				name: '',
				version: '',
				config: {}
			},
			stats: {
				interval: 0,
				signal: 0,
				uptime: 0
			},
			state: 'init'
		},
		nodes: {}
	};
}

export function connect(): void {
	if (client) {
		client.removeAllListeners();
		client.end();
		client = null;
	}

	const credentials = get(auth);
	if (!credentials) {
		mqttConnection.setState('error', 'No credentials');
		return;
	}

	reconnectAttempts = 0;
	mqttConnection.setState('connecting');
	device.set(initializeDevice());

	const host = credentials.host;
	const url = host.startsWith('wss://') || host.startsWith('ws://') ? host : `wss://${host}`;

	try {
		client = mqtt.connect(url, {
			username: credentials.username,
			password: credentials.password,
			protocolVersion: 4,
			clean: true,
			reconnectPeriod: 5000,
			connectTimeout: 10000
		});

		client.on('connect', () => {
			mqttConnection.setState('connected');
			reconnectAttempts = 0;

			client?.subscribe(`${HOMIE_PREFIX}/${DEVICE_ID}/#`, { qos: 1 }, (err) => {
				if (err) {
					console.error('Subscription error:', err);
				}
			});
		});

		client.on('message', (topic, payload) => {
			const message = payload.toString();
			parseHomieMessage(topic, message);
		});

		client.on('error', (err) => {
			console.error('MQTT error:', err);
			mqttConnection.setState('error', err.message);
		});

		client.on('close', () => {
			mqttConnection.setState('disconnected');
		});

		client.on('reconnect', () => {
			reconnectAttempts++;
			if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
				mqttConnection.setState('error', 'Max reconnection attempts reached');
				disconnect();
			} else {
				mqttConnection.setState('connecting');
			}
		});
	} catch (err: unknown) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		mqttConnection.setState('error', errorMessage);
	}
}

export function disconnect(): void {
	if (client) {
		client.end();
		client = null;
	}
	device.clear();
	history.clear();
	mqttConnection.setState('disconnected');
}

export function publish(topic: string, message: string): void {
	if (client && client.connected) {
		client.publish(topic, message, { qos: 1 });
	}
}

export function setProperty(nodeId: string, propertyId: string, value: string): void {
	const topic = `${HOMIE_PREFIX}/${DEVICE_ID}/${nodeId}/${propertyId}/set`;
	publish(topic, value);
}

export { mqttConnection };
