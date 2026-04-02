<script lang="ts">
	import { WifiIcon, ClockIcon, CpuIcon, SettingsIcon } from 'svelte-feather-icons';
	import type { HomieDevice } from '$lib/types/homie';
	import { locale, t } from '$lib/i18n';

	let { device }: { device: HomieDevice } = $props();
	let translations = $derived(t($locale));

	function formatUptime(seconds: number): string {
		const days = Math.floor(seconds / 86400);
		const hours = Math.floor((seconds % 86400) / 3600);
		const mins = Math.floor((seconds % 3600) / 60);

		if (days > 0) return `${days}d ${hours}h ${mins}m`;
		if (hours > 0) return `${hours}h ${mins}m`;
		return `${mins}m`;
	}

	function formatSignalStrength(signal: number): { strength: string; quality: string } {
		if (signal >= 67)
			return { strength: translations.signalStrength.excellent, quality: 'bg-green-500' };
		if (signal >= 50) return { strength: translations.signalStrength.good, quality: 'bg-blue-500' };
		if (signal >= 33)
			return { strength: translations.signalStrength.fair, quality: 'bg-yellow-500' };
		return { strength: translations.signalStrength.weak, quality: 'bg-red-500' };
	}

	const signalInfo = $derived(formatSignalStrength(device.attributes.stats.signal));
</script>

<div class="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
	<div class="mb-6 flex items-center justify-between">
		<h2 class="text-xl font-bold text-gray-900 dark:text-white">{device.attributes.name}</h2>
		<div class="flex items-center space-x-2">
			<div class="h-3 w-3 rounded-full {device.online ? 'bg-green-500' : 'bg-red-500'}"></div>
			<span class="text-sm text-gray-600 dark:text-gray-400">
				{device.online ? translations.common.online : translations.common.offline}
			</span>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		<div class="flex items-center space-x-3">
			<div class="rounded-lg bg-blue-100 p-2 dark:bg-blue-800">
				<WifiIcon class="h-5 w-5 text-blue-600 dark:text-blue-400" />
			</div>
			<div>
				<p class="text-xs text-gray-500 dark:text-gray-400">{translations.status.signal}</p>
				<div class="flex items-center space-x-2">
					<p class="text-sm font-semibold text-gray-900 dark:text-white">
						{device.attributes.stats.signal}%
					</p>
					<span class="text-xs text-gray-500 dark:text-gray-400">({signalInfo.strength})</span>
				</div>
			</div>
		</div>

		<div class="flex items-center space-x-3">
			<div class="rounded-lg bg-purple-100 p-2 dark:bg-purple-800">
				<ClockIcon class="h-5 w-5 text-purple-600 dark:text-purple-400" />
			</div>
			<div>
				<p class="text-xs text-gray-500 dark:text-gray-400">{translations.status.uptime}</p>
				<p class="text-sm font-semibold text-gray-900 dark:text-white">
					{formatUptime(device.attributes.stats.uptime)}
				</p>
			</div>
		</div>

		<div class="flex items-center space-x-3">
			<div class="rounded-lg bg-green-100 p-2 dark:bg-green-800">
				<CpuIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
			</div>
			<div>
				<p class="text-xs text-gray-500 dark:text-gray-400">{translations.status.firmware}</p>
				<p class="text-sm font-semibold text-gray-900 dark:text-white">
					{device.attributes.fw.name} v{device.attributes.fw.version}
				</p>
			</div>
		</div>

		<div class="flex items-center space-x-3">
			<div class="rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
				<SettingsIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
			</div>
			<div>
				<p class="text-xs text-gray-500 dark:text-gray-400">{translations.status.implementation}</p>
				<p class="text-sm font-semibold text-gray-900 dark:text-white">
					{device.attributes.implementation.name}
					{device.attributes.implementation.version}
				</p>
			</div>
		</div>
	</div>

	<div class="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
		<div class="grid grid-cols-2 gap-4 text-sm">
			<div>
				<span class="text-gray-500 dark:text-gray-400">MAC:</span>
				<span class="ml-2 font-mono text-gray-900 dark:text-white">{device.attributes.mac}</span>
			</div>
			<div>
				<span class="text-gray-500 dark:text-gray-400">IP:</span>
				<span class="ml-2 font-mono text-gray-900 dark:text-white">{device.attributes.localip}</span
				>
			</div>
		</div>
	</div>
</div>
