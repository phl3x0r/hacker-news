<!-- TerminalOutput.svelte -->
<script>
	import { terminalSpeedFactor } from '$lib/constants';
	import { States } from '$lib/states';
	import { createEventDispatcher } from 'svelte';
	export let inputString = 'NO DATA';
	export let showCursor = true;

	const dispatch = createEventDispatcher();

	let currentIndex = 0;

	const simulateTerminalOutput = () => {
		if (currentIndex < inputString.length) {
			const randomDelay = (1 / terminalSpeedFactor) * (Math.floor(Math.random() * 50) + 50); // Random delay between 50ms and 100ms
			setTimeout(() => {
				currentIndex += 1;
				simulateTerminalOutput();
			}, randomDelay);
		} else {
			dispatch('stateChange', {
				state: States.Done
			});
		}
	};

	$: {
		// Use a reactive statement to watch for changes in inputString
		currentIndex = 0; // Reset currentIndex
		if (inputString !== '') {
			simulateTerminalOutput(); // Start the simulation
		}
	}
</script>

<div class="terminal-output">
	{#if currentIndex < inputString.length}
		{inputString.substring(0, currentIndex)}
	{:else}
		{inputString}
	{/if}
	{#if showCursor}
		<span class="cursor" />
	{/if}
</div>

<style type="text/scss" lang="scss">
	button {
		z-index: 10;
		display: block;
	}
	.cursor {
		display: inline-block;
		width: 8px;
		height: 16px;
		background-color: white;
		margin-left: 2px;
		animation: cursorBlink 0.7s infinite;
	}

	@keyframes cursorBlink {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}
</style>
