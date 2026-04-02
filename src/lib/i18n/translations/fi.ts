export default {
	common: {
		connect: 'Yhdistä',
		logout: 'Kirjaudu ulos',
		loading: 'Ladataan...',
		online: 'Online',
		offline: 'Offline'
	},
	login: {
		title: 'Nappula',
		subtitle: 'Valvo ja ohjaa Nappulaa',
		mqttUrl: 'MQTT WebSocket-URL',
		mqttUrlPlaceholder: 'wss://mqtt.example.com:8084',
		username: 'Käyttäjätunnus',
		password: 'Salasana'
	},
	connection: {
		connected: 'Yhdistetty',
		connecting: 'Yhdistetään...',
		disconnected: 'Yhteys katkaistu',
		error: 'Virhe'
	},
	status: {
		signal: 'WiFi-signaali',
		uptime: 'Käyntiaika',
		firmware: 'Laiteohjelmisto',
		implementation: 'Ohjain'
	},
	signalStrength: {
		excellent: 'Erinomainen',
		good: 'Hyvä',
		fair: 'Kohtalainen',
		weak: 'Heikko'
	},
	sensors: {
		title: 'Mökin olosuhteet',
		temperature: 'Lämpötila',
		humidity: 'Kosteus',
		pressure: 'Ilmanpaine'
	},
	controls: {
		title: 'Ohjaimet',
		acPower: 'Ilmalämpöpumppu',
		reboot: 'Käynnistä Nappula uudelleen',
		triggerReboot: 'Käynnistä Nappula-ohjain uudelleen'
	},
	device: {
		offline: 'Nappula offline-tilassa',
		offlineMessage:
			'Nappula ei vastaa. Se voi olla sammutettu tai käynnistymässä. Hallintapaneeli päivittyy automaattisesti, kun se tulee takaisin verkostoon.'
	},
	error: {
		title: 'Yhteysvirhe',
		tryAgain: 'Yritä uudelleen'
	},
	confirm: {
		confirm: 'Vahvista',
		cancel: 'Peruuta',
		rebootTitle: 'Käynnistä Nappula uudelleen?',
		rebootMessage:
			'Tämä käynnistää Nappulan uudelleen. Anturitiedot eivät ole saatavilla uudelleenkäynnistyksen aikana.'
	},
	loading: {
		connecting: 'Yhdistetään Nappulaan...',
		waiting: 'Odotetaan anturitietoja...'
	},
	pageTitle: 'Nappula'
};
