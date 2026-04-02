<script lang="ts">
	let {
		title,
		message,
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		confirmClass = 'bg-blue-600 hover:bg-blue-700',
		onConfirm,
		onCancel,
		open = false
	}: {
		title: string;
		message: string;
		confirmText?: string;
		cancelText?: string;
		confirmClass?: string;
		onConfirm: () => void;
		onCancel: () => void;
		open?: boolean;
	} = $props();
</script>

{#if open}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
		onclick={onCancel}
		onkeydown={(e) => e.key === 'Escape' && onCancel()}
		role="button"
		tabindex="-1"
	>
		<div
			class="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && onCancel()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
			<p class="mb-6 text-gray-600 dark:text-gray-400">{message}</p>
			<div class="flex justify-end space-x-3">
				<button
					onclick={onCancel}
					class="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
				>
					{cancelText}
				</button>
				<button
					onclick={onConfirm}
					class="rounded-lg px-4 py-2 font-semibold text-white transition-colors {confirmClass}"
				>
					{confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}
