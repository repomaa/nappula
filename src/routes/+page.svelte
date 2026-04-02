<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { device } from '$lib/stores/device';
	import { mqttConnection } from '$lib/stores/mqtt-client';
	import { connect, disconnect } from '$lib/stores/mqtt-client';
	import { locale, t } from '$lib/i18n';
	import Login from '$lib/components/Login.svelte';
	import ConnectionStatus from '$lib/components/ConnectionStatus.svelte';
	import DeviceInfo from '$lib/components/DeviceInfo.svelte';
	import SensorGrid from '$lib/components/SensorGrid.svelte';
	import ControlsGrid from '$lib/components/ControlsGrid.svelte';
	import OfflineHero from '$lib/components/OfflineHero.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import ConnectionError from '$lib/components/ConnectionError.svelte';
	import type { ConnectionCredentials } from '$lib/types/homie';

	let isAuthenticated = $state(false);
	let translations = $derived(t($locale));

	onMount(() => {
		const unsubscribe = auth.subscribe((c) => {
			if (c) {
				isAuthenticated = true;
				connect();
			}
		});
		return unsubscribe;
	});

	function handleLogin(credentials: ConnectionCredentials) {
		auth.save(credentials);
	}

	function handleLogout() {
		disconnect();
		auth.clear();
		isAuthenticated = false;
	}
</script>

<svelte:head>
	<title>{translations.pageTitle}</title>
</svelte:head>

{#if !isAuthenticated}
	<Login onConnect={handleLogin} />
{:else}
	<ConnectionStatus onLogout={handleLogout} />

	<div class="min-h-dvh bg-gray-100 px-4 py-8 dark:bg-gray-900">
		<div class="mx-auto mt-12 max-w-7xl space-y-6">
			{#if $mqttConnection.state === 'connecting'}
				<LoadingSpinner message={translations.loading.connecting} />
			{:else if $mqttConnection.state === 'error' || $mqttConnection.state === 'disconnected'}
				<ConnectionError error={$mqttConnection.error || translations.connection.disconnected} />
			{:else if $device && !$device.online}
				<OfflineHero />
			{:else if $device}
				<DeviceInfo device={$device} />
				<SensorGrid device={$device} />
				<ControlsGrid device={$device} />
			{:else}
				<LoadingSpinner message={translations.loading.waiting} />
			{/if}
		</div>
	</div>
{/if}
