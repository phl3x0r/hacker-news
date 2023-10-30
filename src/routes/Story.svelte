<!-- TerminalOutput.svelte -->
<script lang="ts">
	import { terminalSpeedFactor } from '$lib/constants';
	import { createEventDispatcher } from 'svelte';
	import type { StoryAndUserType } from '$lib/model';
	import TerminalOutput from './TerminalOutput.svelte';
	import { States } from '$lib/states';
	import { formatTime } from '$lib/util';

	export let index: number;
	export let story: StoryAndUserType;

	const dispatch = createEventDispatcher();

	let state = -1;
	const dispatchDone = () => {
		state++;
		dispatch('stateChange', {
			state: States.Done
		});
	};
	export const formatUser = ({ by, user: { karma } }: StoryAndUserType): string => {
		return `${by}, ${karma} karma`;
	};
</script>

<div class="story">
	<span>
		<TerminalOutput
			inputString={`#${(index + 1).toString()}`}
			showCursor={state === -1}
			on:stateChange={() => state++}
		/>
	</span>
	{#if state >= 0}
		<div class="story-line">
			<span>
				<TerminalOutput
					inputString={'title'}
					showCursor={state === 0}
					on:stateChange={() => state++}
				/>
			</span>
			{#if state >= 1}
				<span>
					<TerminalOutput
						inputString={story.title}
						showCursor={state === 1}
						on:stateChange={() => state++}
					/>
				</span>
			{/if}
		</div>
	{/if}
	{#if state >= 2}
		<div class="story-line">
			<span>
				<TerminalOutput
					inputString={'author'}
					showCursor={state === 2}
					on:stateChange={() => state++}
				/>
			</span>
			{#if state >= 3}
				<span>
					<TerminalOutput
						inputString={formatUser(story)}
						showCursor={state === 3}
						on:stateChange={() => state++}
					/>
				</span>
			{/if}
		</div>
	{/if}
	{#if state >= 4}
		<div class="story-line">
			<span>
				<TerminalOutput
					inputString={'score'}
					showCursor={state === 4}
					on:stateChange={() => state++}
				/>
			</span>
			{#if state >= 5}
				<span>
					<TerminalOutput
						inputString={story.score.toString()}
						showCursor={state === 5}
						on:stateChange={() => state++}
					/>
				</span>
			{/if}
		</div>
	{/if}
	{#if state >= 6}
		<div class="story-line">
			<span>
				<TerminalOutput
					inputString={'posted'}
					showCursor={state === 6}
					on:stateChange={() => state++}
				/>
			</span>
			{#if state >= 7}
				<span>
					<TerminalOutput
						inputString={formatTime(story.time)}
						showCursor={state === 7}
						on:stateChange={() => state++}
					/>
				</span>
			{/if}
		</div>
	{/if}
	{#if state >= 8}
		<div class="story-line">
			<span>
				<TerminalOutput
					inputString={'url'}
					showCursor={state === 8}
					on:stateChange={() => state++}
				/>
			</span>
			{#if state >= 9}
				<a href={story.url}>
					<TerminalOutput
						inputString={story.url}
						showCursor={state === 9}
						on:stateChange={dispatchDone}
					/>
				</a>
			{/if}
		</div>
	{/if}
</div>

<style type="text/scss" lang="scss">
	.story {
		margin-top: 1rem;
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		.story-line {
			margin-top: 0.125rem;
			display: flex;
			flex-direction: row;
			flex-grow: 1;
			span:first-of-type {
				width: 6rem;
				min-width: 6rem;
			}
			span:last-of-type,
			a {
				display: inline-flex;
				line-break: anywhere;
			}
		}
	}
</style>
