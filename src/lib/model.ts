export type StoryIDs = Array<number>;

export interface StoryType {
	by: string;
	descendants: number;
	id: number;
	kids: Array<number>;
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
}

export interface UserType {
	about: string;
	created: number;
	delay: number;
	id: string;
	karma: number;
	submitted: StoryIDs;
}

export interface StoryAndUserType extends StoryType {
	user: UserType;
}
