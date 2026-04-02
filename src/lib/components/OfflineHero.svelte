<script lang="ts">
	import { WifiOffIcon } from 'svelte-feather-icons';
	import { locale, t } from '$lib/i18n';

	let translations = $derived(t($locale));
</script>

<div
	class="flex min-h-[400px] items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
>
	<div class="px-8 text-center">
		<div class="mb-6 flex justify-center">
			<div class="rounded-full bg-red-100 p-6 dark:bg-red-900/30">
				<WifiOffIcon class="h-16 w-16 text-red-600 dark:text-red-400" />
			</div>
		</div>
		<h2 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
			{translations.device.offline}
		</h2>
		<p class="max-w-md text-gray-600 dark:text-gray-400">
			{translations.device.offlineMessage}
		</p>
	</div>
</div>
