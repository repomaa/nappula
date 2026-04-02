<script lang="ts">
	import { ThermometerIcon, DropletIcon, ActivityIcon } from 'svelte-feather-icons';
	import SensorGraph from './SensorGraph.svelte';
	import { history } from '$lib/stores/history';
	import type { HistoryPoint } from '$lib/stores/history';
	import { locale, t } from '$lib/i18n';

	interface SensorData {
		type: 'temperature' | 'humidity' | 'pressure';
		value: number;
		unit: string;
	}

	let { data }: { data: SensorData } = $props();
	let translations = $derived(t($locale));

	const historyData = $derived($history[data.type] as HistoryPoint[]);

	const sensorStyles = {
		temperature: {
			icon: ThermometerIcon,
			color: 'text-red-500',
			colorClass: 'text-red-500 dark:text-red-400',
			bg: 'bg-red-100 dark:bg-red-800'
		},
		humidity: {
			icon: DropletIcon,
			color: 'text-blue-500',
			colorClass: 'text-blue-500 dark:text-blue-400',
			bg: 'bg-blue-100 dark:bg-blue-800'
		},
		pressure: {
			icon: ActivityIcon,
			color: 'text-green-500',
			colorClass: 'text-green-500 dark:text-green-400',
			bg: 'bg-green-100 dark:bg-green-800'
		}
	} as const;

	const style = $derived(sensorStyles[data.type]);
	const Icon = $derived(style.icon);

	const sensorLabel = $derived(
		data.type === 'temperature'
			? translations.sensors.temperature
			: data.type === 'humidity'
				? translations.sensors.humidity
				: translations.sensors.pressure
	);
</script>

<div class="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
	<div class="flex items-start justify-between">
		<div class="flex-1">
			<p class="text-sm font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
				{sensorLabel}
			</p>
			<p class="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
				{data.value.toFixed(2)}
				<span class="text-2xl">{data.unit}</span>
			</p>
		</div>
		<div class="{style.bg} rounded-lg p-3">
			<Icon class="h-6 w-6 {style.colorClass}" />
		</div>
	</div>
	<SensorGraph data={historyData} color={style.color} />
</div>
