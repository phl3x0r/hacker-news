import { storyLimit } from './constants';
import type { StoryType, StoryIDs, StoryAndUserType } from './model';
import { generateRandomIntegers } from './util';

const getStoryIds = async (): Promise<StoryIDs> => {
	try {
		const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
		const data = (await response.json()) as StoryIDs;
		return generateRandomIntegers(storyLimit, data.length - 1).reduce(
			(acc, cur) => [...acc, data[cur]],
			[] as StoryIDs
		);
	} catch (error) {
		console.error('Error fetching top stories:', error);
		throw error; // Optionally, you can throw the error for better error handling.
	}
};

//
const getUser = async (userID: string) => {
	try {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/user/${userID}.json`);
		const user = await response.json();
		return user;
	} catch (error) {
		console.error(`Error fetching user ${userID}:`, error);
		throw error; // Optionally, you can throw the error for better error handling.
	}
};

const getStory = async (storyID: number): Promise<StoryType> => {
	try {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
		const story = await response.json();
		return story;
	} catch (error) {
		console.error(`Error fetching story ${storyID}:`, error);
		throw error; // Optionally, you can throw the error for better error handling.
	}
};

export const getRandomStories = async () => {
	try {
		const ids = await getStoryIds();
		const storyPromises = ids.map(async (id) => {
			// Fetch the story by ID
			const story = await getStory(id);

			// Fetch the user by ID
			const user = await getUser(story.by);

			return { story, user };
		});

		const stories = await Promise.all(storyPromises);

		// Convert StoryType to StoryAndUserType
		const storiesWithUsers: StoryAndUserType[] = stories.map(({ story, user }) => ({
			...story,
			user
		}));

		return storiesWithUsers.sort((a, b) => a.score - b.score);
	} catch (error) {
		console.error('Error fetching random stories:', error);
		throw error; // Optionally, you can throw the error for better error handling.
	}
};
