<script lang="ts">
	import SensorCard from './SensorCard.svelte';
	import type { HomieDevice } from '$lib/types/homie';
	import { locale, t } from '$lib/i18n';

	let { device }: { device: HomieDevice } = $props();
	let translations = $derived(t($locale));

	const hasSensors = $derived(
		device.nodes.temperature?.properties.value ||
			device.nodes.humidity?.properties.value ||
			device.nodes.pressure?.properties.value
	);
</script>

{#if hasSensors}
	<div class="mt-8">
		<h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
			{translations.sensors.title}
		</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
			{#if device.nodes.temperature?.properties.value}
				<SensorCard
					data={{
						type: 'temperature',
						value: parseFloat(device.nodes.temperature.properties.value.value as string),
						unit: '°C'
					}}
				/>
			{/if}
			{#if device.nodes.humidity?.properties.value}
				<SensorCard
					data={{
						type: 'humidity',
						value: parseFloat(device.nodes.humidity.properties.value.value as string),
						unit: '%'
					}}
				/>
			{/if}
			{#if device.nodes.pressure?.properties.value}
				<SensorCard
					data={{
						type: 'pressure',
						value: parseFloat(device.nodes.pressure.properties.value.value as string) / 100,
						unit: 'hPa'
					}}
				/>
			{/if}
		</div>
	</div>
{/if}
