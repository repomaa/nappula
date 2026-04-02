export default {
	common: {
		connect: 'Verbinden',
		logout: 'Abmelden',
		loading: 'Laden...',
		online: 'Online',
		offline: 'Offline'
	},
	login: {
		title: 'Nappula',
		subtitle: 'Überwache und steuere Nappula',
		mqttUrl: 'MQTT WebSocket-URL',
		mqttUrlPlaceholder: 'wss://mqtt.example.com:8084',
		username: 'Benutzername',
		password: 'Passwort'
	},
	connection: {
		connected: 'Verbunden',
		connecting: 'Verbinden...',
		disconnected: 'Getrennt',
		error: 'Fehler'
	},
	status: {
		signal: 'WLAN-Signal',
		uptime: 'Betriebszeit',
		firmware: 'Firmware',
		implementation: 'Controller'
	},
	signalStrength: {
		excellent: 'Ausgezeichnet',
		good: 'Gut',
		fair: 'Mittel',
		weak: 'Schwach'
	},
	sensors: {
		title: 'Mökkizustand',
		temperature: 'Temperatur',
		humidity: 'Luftfeuchtigkeit',
		pressure: 'Luftdruck'
	},
	controls: {
		title: 'Steuerung',
		acPower: 'Wärmepumpe',
		acPowerOn: 'Einschalten',
		acPowerStatus: 'Wärmepumpe einschalten',
		reboot: 'Nappula neustarten',
		triggerReboot: 'Nappula neustarten'
	},
	device: {
		offline: 'Nappula offline',
		offlineMessage:
			'Nappula antwortet nicht. Es ist möglicherweise ausgeschaltet oder startet neu. Das Dashboard wird automatisch aktualisiert, wenn es wieder online ist.'
	},
	error: {
		title: 'Verbindungsfehler',
		tryAgain: 'Erneut versuchen'
	},
	confirm: {
		confirm: 'Bestätigen',
		cancel: 'Abbrechen',
		acPowerTitle: 'Wärmepumpe einschalten?',
		acPowerMessage: 'Dies sendet einen Befehl zum Einschalten der Wärmepumpe.',
		rebootTitle: 'Nappula neustarten?',
		rebootMessage: 'Dies startet Nappula neu. Sensordaten sind währenddessen nicht verfügbar.'
	},
	loading: {
		connecting: 'Verbinde zu Nappula...',
		waiting: 'Warte auf Sensordaten...'
	},
	pageTitle: 'Nappula'
};
