export const generateRandomIntegers = (x: number, y: number): number[] => {
	if (x > y) {
		throw new Error('Cannot generate more unique random integers than the range allows.');
	}

	const result: number[] = [];
	while (result.length < x) {
		const randomInt = Math.floor(Math.random() * (y + 1));
		if (!result.includes(randomInt)) {
			result.push(randomInt);
		}
	}

	return result;
};

export const formatTime = (time: number): string => {
	const d = new Date(time * 1000);
	return d.toLocaleDateString();
};
