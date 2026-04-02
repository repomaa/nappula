<script lang="ts">
	import { AlertTriangleIcon } from 'svelte-feather-icons';
	import { locale, t } from '$lib/i18n';

	let {
		error,
		onRetry,
		retryText
	}: {
		error?: string;
		onRetry?: () => void;
		retryText?: string;
	} = $props();

	let translations = $derived(t($locale));
	const buttonText = $derived(retryText ?? translations.error.tryAgain);
</script>

<div class="flex min-h-[400px] items-center justify-center">
	<div class="text-center">
		<div class="mb-4 inline-block rounded-full bg-red-100 p-6 dark:bg-red-900/30">
			<AlertTriangleIcon class="h-16 w-16 text-red-600 dark:text-red-400" />
		</div>
		<h2 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
			{translations.error.title}
		</h2>
		<p class="text-gray-600 dark:text-gray-400">{error}</p>
		{#if onRetry}
			<button
				onclick={onRetry}
				class="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
			>
				{buttonText}
			</button>
		{/if}
	</div>
</div>
