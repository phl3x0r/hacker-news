<script lang="ts">
	import { getRandomStories } from '$lib/data';
	import type { States } from '$lib/states';
	import { onMount } from 'svelte';
	import Starfield from './Starfield.svelte';
	import TerminalOutput from './TerminalOutput.svelte';
	import Story from './Story.svelte';
	import type { StoryAndUserType, StoryType } from '$lib/model';
	import { terminalSpeedFactor } from '$lib/constants';

	let state = 0;
	let isLoading = true;
	let isLoadingRendering = true;
	let isTitleRendering = true;
	let isReady = false;
	let storyRender = 0;

	const setTitleRenderDone = (e: CustomEvent<States>) => {
		setTimeout(() => (isTitleRendering = false), 1500 / terminalSpeedFactor);
	};

	const setLoadingRenderDone = (e: CustomEvent<States>) => {
		setTimeout(() => (isLoadingRendering = false), 1500 / terminalSpeedFactor);
	};

	const setReady = (e: CustomEvent<States>) => {
		setTimeout(() => (isReady = true), 500 / terminalSpeedFactor);
	};

	const welcomeMessage = 'randomized Hacker News aggregator';

	let stories: StoryAndUserType[];

	onMount(async () => {
		const storiesPromise = getRandomStories();
		try {
			stories = await storiesPromise;
			isLoading = false;
		} catch (error) {
			console.error('Error fetching stories:', error);
		}
	});
</script>

<Starfield />
<div class="page">
	<div class="container">
		<TerminalOutput
			inputString={welcomeMessage}
			showCursor={isTitleRendering}
			on:stateChange={setTitleRenderDone}
		/>
		{#if !isTitleRendering}
			<div class="loading-text">
				<TerminalOutput
					inputString={'loading...'}
					showCursor={isLoadingRendering}
					on:stateChange={setLoadingRenderDone}
				/>
				{#if !isLoading && !isLoadingRendering && stories}
					<TerminalOutput inputString={'done'} showCursor={!isReady} on:stateChange={setReady} />
				{/if}
			</div>
			{#if isReady}
				<div class="stories">
					{#each stories as story, index}
						{#if storyRender >= index}
							<Story {story} {index} on:stateChange={() => (storyRender = index + 1)} />
						{/if}
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style type="text/scss" lang="scss">
	$terminal-color: rgb(74 246 38);
	.page {
		display: flex;
		align-items: center;
		overflow: auto;
		max-height: 100%;
		flex-direction: column-reverse;

		.container {
			@media (min-width: 40rem) {
				width: 40rem;
			}

			flex-direction: column;
			display: flex;
			justify-content: center;
			flex-grow: 1;
			border: 0.125rem double $terminal-color;
			outline: 0.125rem double $terminal-color;
			padding: 1rem;
			background: rgb(20 20 31 / 50%);
			background-image: url(assets/great-success.png);
			background-position: top;
			background-repeat: repeat-y;
			background-attachment: fixed;
			color: $terminal-color;
			max-height: 100%;
			.stories {
				margin-top: 1rem;
			}
		}

		.loading-text {
			display: flex;
			flex-direction: row;
			margin-top: 1rem;
		}
	}
</style>
