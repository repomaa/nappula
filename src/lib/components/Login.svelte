<script lang="ts">
	import type { ConnectionCredentials } from '$lib/types/homie';
	import { locale, t } from '$lib/i18n';
	import { XIcon } from 'svelte-feather-icons';

	let {
		onConnect,
		error
	}: {
		onConnect: (credentials: ConnectionCredentials) => void;
		error?: string;
	} = $props();

	let translations = $derived(t($locale));
	let host = $state('');
	let username = $state('');
	let password = $state('');
	let showPassword = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		onConnect({ host, username, password });
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
	<div class="w-full max-w-md">
		<div class="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
			<div class="mb-8 text-center">
				<div class="mb-4 flex items-center justify-center">
					<svg
						class="h-16 w-16 text-blue-600 dark:text-blue-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h.01M15 9h.01M9 15h.01M15 15h.01"
						/>
					</svg>
				</div>
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white">{translations.login.title}</h1>
				<p class="mt-2 text-gray-600 dark:text-gray-400">{translations.login.subtitle}</p>
			</div>

			{#if error}
				<div
					class="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
				>
					<div class="flex items-center">
						<XIcon class="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />
						<p class="text-sm text-red-800 dark:text-red-200">{error}</p>
					</div>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="host" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						{translations.login.mqttUrl}
					</label>
					<input
						type="text"
						id="host"
						bind:value={host}
						placeholder={translations.login.mqttUrlPlaceholder}
						required
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					/>
				</div>

				<div>
					<label
						for="username"
						class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						{translations.login.username}
					</label>
					<input
						type="text"
						id="username"
						bind:value={username}
						required
						autocomplete="username"
						class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					/>
				</div>

				<div>
					<label
						for="password"
						class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						{translations.login.password}
					</label>
					<div class="relative">
						<input
							type={showPassword ? 'text' : 'password'}
							id="password"
							bind:value={password}
							required
							autocomplete="current-password"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
						>
							{#if showPassword}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
									/>
								</svg>
							{:else}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							{/if}
						</button>
					</div>
				</div>

				<button
					type="submit"
					class="mt-8 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
				>
					{translations.common.connect}
				</button>
			</form>
		</div>
	</div>
</div>
