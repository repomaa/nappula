<script lang="ts">
	import { PowerIcon, RefreshCwIcon } from 'svelte-feather-icons';
	import { setProperty } from '$lib/stores/mqtt-client';
	import ConfirmDialog from './ConfirmDialog.svelte';
	import { locale, t } from '$lib/i18n';

	interface ControlData {
		nodeId: string;
		propertyId: string;
		type: 'ac' | 'reboot';
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
		showDialog = true;
	}

	function confirmAction() {
		if (data.type === 'ac') {
			setProperty(data.nodeId, data.propertyId, 'true');
		} else {
			setProperty(data.nodeId, data.propertyId, 'true');
		}
		showDialog = false;
	}

	const title = $derived(
		data.type === 'ac' ? translations.controls.acPower : translations.controls.reboot
	);

	const statusText = $derived(
		data.type === 'ac' ? translations.controls.acPowerStatus : translations.controls.triggerReboot
	);

	const dialogTitle = $derived(
		data.type === 'ac' ? translations.confirm.acPowerTitle : translations.confirm.rebootTitle
	);

	const dialogMessage = $derived(
		data.type === 'ac' ? translations.confirm.acPowerMessage : translations.confirm.rebootMessage
	);

	const confirmText = $derived(
		data.type === 'ac' ? translations.controls.acPowerOn : translations.controls.reboot
	);
</script>

<div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
	<div class="flex items-center justify-between">
		<div class="flex items-center space-x-4">
			<div class="rounded-lg bg-gray-100 p-3 dark:bg-gray-700">
				<Icon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
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

		<button
			onclick={handleToggle}
			class="rounded-lg {data.type === 'ac'
				? 'bg-green-600 hover:bg-green-700'
				: 'bg-orange-600 hover:bg-orange-700'} px-4 py-2 font-semibold text-white transition-colors"
		>
			{data.type === 'ac' ? translations.controls.acPowerOn : translations.controls.reboot}
		</button>
	</div>
</div>

<ConfirmDialog
	title={dialogTitle}
	message={dialogMessage}
	{confirmText}
	confirmClass={data.type === 'ac'
		? 'bg-green-600 hover:bg-green-700'
		: 'bg-orange-600 hover:bg-orange-700'}
	open={showDialog}
	onConfirm={confirmAction}
	onCancel={() => (showDialog = false)}
/>
