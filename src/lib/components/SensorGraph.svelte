<script lang="ts">
	import type { HistoryPoint } from '$lib/stores/history';

	let { data, color = 'text-blue-500' }: { data: HistoryPoint[]; color?: string } = $props();

	const colorMap: Record<string, string> = {
		'text-red-500': '#ef4444',
		'text-red-400': '#f87171',
		'text-blue-500': '#3b82f6',
		'text-blue-400': '#60a5fa',
		'text-green-500': '#22c55e',
		'text-green-400': '#4ade80'
	};

	const darkColorMap: Record<string, string> = {
		'text-red-500': '#f87171',
		'text-red-400': '#fca5a5',
		'text-blue-500': '#60a5fa',
		'text-blue-400': '#93c5fd',
		'text-green-500': '#4ade80',
		'text-green-400': '#86efac'
	};

	const strokeColor = $derived(colorMap[color] || '#3b82f6');
	const darkStrokeColor = $derived(darkColorMap[color] || '#60a5fa');

	const viewBoxWidth = 200;
	const viewBoxHeight = 60;
	const padding = 2;

	const values = $derived(data.map((d) => d.value));

	let historicalMin = $state(Infinity);
	let historicalMax = $state(-Infinity);

	$effect(() => {
		if (values.length > 0) {
			const currentMin = Math.min(...values);
			const currentMax = Math.max(...values);
			if (currentMin < historicalMin) historicalMin = currentMin;
			if (currentMax > historicalMax) historicalMax = currentMax;
		}
	});

	const minVal = $derived(historicalMin === Infinity ? 0 : historicalMin);
	const maxVal = $derived(historicalMax === -Infinity ? 1 : historicalMax);

	const yRange = $derived(maxVal - minVal || 1);
	const yMin = $derived(minVal - yRange * 0.05);
	const yMax = $derived(maxVal + yRange * 0.05);
	const yScale = $derived((viewBoxHeight - padding * 2) / (yMax - yMin || 1));

	const graphWidth = $derived(viewBoxWidth - padding * 2);
	const graphHeight = $derived(viewBoxHeight - padding * 2);

	const xScale = $derived(values.length > 1 ? graphWidth / (values.length - 1) : graphWidth);

	function getX(i: number): number {
		return padding + i * xScale;
	}

	function getY(i: number): number {
		return padding + graphHeight - (values[i] - yMin) * yScale;
	}

	const pathData = $derived(
		values.length === 0
			? ''
			: values.length === 1
				? `M ${getX(0)} ${getY(0)} L ${getX(0) + 1} ${getY(0)}`
				: values.map((_, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(i)}`).join(' ')
	);

	const areaPath = $derived(
		values.length === 0
			? ''
			: values.length === 1
				? `M ${getX(0)} ${viewBoxHeight - padding} L ${getX(0)} ${getY(0)} L ${getX(0) + 1} ${getY(0)} L ${getX(0) + 1} ${viewBoxHeight - padding} Z`
				: `M ${getX(0)} ${viewBoxHeight - padding} ${pathData.replace('M', 'L')} L ${getX(values.length - 1)} ${viewBoxHeight - padding} Z`
	);
</script>

{#if data.length > 0}
	<div class="mt-4 w-full">
		<svg
			class="h-16 w-full"
			viewBox="0 0 {viewBoxWidth} {viewBoxHeight}"
			preserveAspectRatio="none"
		>
			<defs>
				<linearGradient id="fill-{color}" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color={strokeColor} stop-opacity="0.12" />
					<stop offset="100%" stop-color={strokeColor} stop-opacity="0.02" />
				</linearGradient>
				<linearGradient id="fill-dark-{color}" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color={darkStrokeColor} stop-opacity="0.12" />
					<stop offset="100%" stop-color={darkStrokeColor} stop-opacity="0.02" />
				</linearGradient>
			</defs>
			<path d={areaPath} fill="url(#fill-{color})" class="dark:hidden" />
			<path d={areaPath} fill="url(#fill-dark-{color})" class="hidden dark:block" />
			<path
				d={pathData}
				fill="none"
				stroke={strokeColor}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="dark:hidden"
			/>
			<path
				d={pathData}
				fill="none"
				stroke={darkStrokeColor}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="hidden dark:block"
			/>
		</svg>
		<div class="mt-1 flex justify-between text-xs text-gray-400">
			<span>{data.length} values</span>
			{#if values.length > 0}
				<span>{minVal.toFixed(1)} - {maxVal.toFixed(1)}</span>
			{/if}
		</div>
	</div>
{/if}
