<script lang="ts">
	let { message = 'Loading...' }: { message?: string } = $props();
</script>

<div class="flex min-h-[400px] items-center justify-center">
	<div class="text-center">
		<div class="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-blue-600"></div>
		<p class="text-gray-600 dark:text-gray-400">{message}</p>
	</div>
</div>
