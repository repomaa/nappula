export default {
	common: {
		connect: 'Connect',
		logout: 'Logout',
		loading: 'Loading...',
		online: 'Online',
		offline: 'Offline'
	},
	login: {
		title: 'Nappula Dashboard',
		subtitle: 'Monitor and control Nappula',
		mqttUrl: 'MQTT WebSocket URL',
		mqttUrlPlaceholder: 'wss://mqtt.example.com:8084',
		username: 'Username',
		password: 'Password'
	},
	connection: {
		connected: 'Connected',
		connecting: 'Connecting...',
		disconnected: 'Disconnected',
		error: 'Error'
	},
	status: {
		signal: 'WiFi Signal',
		uptime: 'Uptime',
		firmware: 'Firmware',
		implementation: 'Controller'
	},
	signalStrength: {
		excellent: 'Excellent',
		good: 'Good',
		fair: 'Fair',
		weak: 'Weak'
	},
	sensors: {
		title: 'Mökki Conditions',
		temperature: 'Temperature',
		humidity: 'Humidity',
		pressure: 'Atmospheric Pressure'
	},
	controls: {
		title: 'Controls',
		acPower: 'AC Power',
		reboot: 'Restart Nappula',
		triggerReboot: 'Restart the Nappula controller'
	},
	device: {
		offline: 'Nappula Offline',
		offlineMessage:
			'Nappula is not responding. It may be powered off or restarting. The dashboard will update automatically when it comes back online.'
	},
	error: {
		title: 'Connection Error',
		tryAgain: 'Try Again'
	},
	confirm: {
		confirm: 'Confirm',
		cancel: 'Cancel',
		rebootTitle: 'Restart Nappula?',
		rebootMessage: 'This will restart Nappula. Sensor data will be unavailable during restart.'
	},
	loading: {
		connecting: 'Connecting to Nappula...',
		waiting: 'Waiting for sensor data...'
	},
	pageTitle: 'Nappula'
};
