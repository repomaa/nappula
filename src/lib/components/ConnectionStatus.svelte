<script lang="ts">
	import { WifiIcon, WifiOffIcon, LogOutIcon } from 'svelte-feather-icons';
	import { mqttConnection } from '$lib/stores/mqtt-client';
	import { locale, t } from '$lib/i18n';

	let { onLogout }: { onLogout: () => void } = $props();
	let translations = $derived(t($locale));
</script>

<div class="fixed top-4 right-4 z-50">
	{#if $mqttConnection.state === 'connected'}
		<div
			class="flex items-center space-x-2 rounded-lg bg-green-100 px-4 py-2 text-green-800 shadow-lg dark:bg-green-900 dark:text-green-200"
		>
			<WifiIcon class="h-5 w-5" />
			<span class="font-medium">{translations.connection.connected}</span>
		</div>
	{:else if $mqttConnection.state === 'connecting'}
		<div
			class="flex items-center space-x-2 rounded-lg bg-yellow-100 px-4 py-2 text-yellow-800 shadow-lg dark:bg-yellow-900 dark:text-yellow-200"
		>
			<WifiIcon class="h-5 w-5 animate-pulse" />
			<span class="font-medium">{translations.connection.connecting}</span>
		</div>
	{:else if $mqttConnection.state === 'error'}
		<div
			class="flex items-center space-x-2 rounded-lg bg-red-100 px-4 py-2 text-red-800 shadow-lg dark:bg-red-900 dark:text-red-200"
		>
			<WifiOffIcon class="h-5 w-5" />
			<span class="font-medium">{translations.connection.error}: {$mqttConnection.error}</span>
		</div>
	{:else}
		<div
			class="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-800 shadow-lg dark:bg-gray-800 dark:text-gray-200"
		>
			<WifiOffIcon class="h-5 w-5" />
			<span class="font-medium">{translations.connection.disconnected}</span>
		</div>
	{/if}

	<button
		onclick={onLogout}
		class="absolute right-0 -bottom-12 flex items-center space-x-2 rounded-lg bg-gray-200 px-4 py-2 text-gray-900 shadow-lg transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
	>
		<LogOutIcon class="h-5 w-5" />
		<span>{translations.common.logout}</span>
	</button>
</div>
