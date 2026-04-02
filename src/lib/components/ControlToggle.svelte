<script lang="ts">
	import { PowerIcon, RefreshCwIcon } from 'svelte-feather-icons';
	import { setProperty } from '$lib/stores/mqtt-client';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import { locale, t } from '$lib/i18n';

	interface ControlData {
		nodeId: string;
		propertyId: string;
		type: 'ac' | 'reboot';
		value: boolean;
	}

	let { data }: { data: ControlData } = $props();
	let showDialog = $state(false);
	let translations = $derived(t($locale));

	const icons = {
		ac: PowerIcon,
		reboot: RefreshCwIcon
	};

	const Icon = $derived(icons[data.type]);

	function handleToggle() {
		if (data.type === 'ac') {
			const newValue = !data.value;
			setProperty(data.nodeId, data.propertyId, newValue.toString());
		} else {
			showDialog = true;
		}
	}

	function confirmReboot() {
		setProperty(data.nodeId, data.propertyId, 'true');
		showDialog = false;
	}

	const title = $derived(
		data.type === 'ac' ? translations.controls.acPower : translations.controls.reboot
	);

	const statusText = $derived(
		data.type === 'ac' ? (data.value ? 'ON' : 'OFF') : translations.controls.triggerReboot
	);
</script>

<div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div
				class="rounded-lg p-3 {data.value
					? 'bg-green-100 dark:bg-green-800'
					: 'bg-gray-100 dark:bg-gray-700'}"
			>
				<Icon
					class="h-6 w-6 {data.value
						? 'text-green-600 dark:text-green-400'
						: 'text-gray-600 dark:text-gray-400'}"
				/>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-gray-900 capitalize dark:text-white">
					{title}
				</h3>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					{statusText}
				</p>
			</div>
		</div>

		{#if data.type === 'ac'}
			<button
				onclick={handleToggle}
				aria-label="Toggle AC"
				class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors {data.value
					? 'bg-blue-600'
					: 'bg-gray-300 dark:bg-gray-600'}"
			>
				<span
					class="inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform {data.value
						? 'translate-x-7'
						: 'translate-x-1'}"
				></span>
			</button>
		{:else}
			<button
				onclick={handleToggle}
				class="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-700"
			>
				{translations.controls.reboot}
			</button>
		{/if}
	</div>
</div>

<ConfirmDialog
	title={translations.confirm.rebootTitle}
	message={translations.confirm.rebootMessage}
	confirmText={translations.controls.reboot}
	confirmClass="bg-orange-600 hover:bg-orange-700"
	open={showDialog}
	onConfirm={confirmReboot}
	onCancel={() => (showDialog = false)}
/>
