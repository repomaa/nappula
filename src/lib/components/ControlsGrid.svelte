<script lang="ts">
	import ControlToggle from './ControlToggle.svelte';
	import type { HomieDevice } from '$lib/types/homie';
	import { locale, t } from '$lib/i18n';

	let { device }: { device: HomieDevice } = $props();
	let translations = $derived(t($locale));

	const hasControls = $derived(device.nodes.ac || device.nodes.reboot);
</script>

{#if hasControls}
	<div class="mt-8">
		<h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
			{translations.controls.title}
		</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#if device.nodes.ac?.properties.trigger}
				<ControlToggle
					data={{
						nodeId: 'ac',
						propertyId: 'trigger',
						type: 'ac',
						value: device.nodes.ac.properties.trigger.value === 'true'
					}}
				/>
			{/if}
			{#if device.nodes.reboot}
				<ControlToggle
					data={{
						nodeId: 'reboot',
						propertyId: 'trigger',
						type: 'reboot',
						value: false
					}}
				/>
			{/if}
		</div>
	</div>
{/if}
