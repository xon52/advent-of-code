import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const emptyString = data.findIndex((item) => item === '');
	const rules = data.slice(0, emptyString);
	const messages = data.slice(emptyString + 1);

	const numbers = {};

	rules.forEach((rule) => {
		const [before, after] = rule.split('|');
		if (numbers[before] === undefined) numbers[before] = { before: [], after: [] };
		if (numbers[after] === undefined) numbers[after] = { before: [], after: [] };
		numbers[before].after.push(after);
		numbers[after].before.push(before);
	});

	const checkMessage = (message) => {
		const messageArr = message.split(',');
		let isCorrect = true;
		for (let i = 0; i < messageArr.length - 1; i++) {
			const current = messageArr[i];
			const next = messageArr[i + 1];
			if (numbers[current].after.indexOf(next) === -1) {
				isCorrect = false;
				break;
			}
		}
		return isCorrect;
	};

	let result = 0;
	messages.forEach((message) => {
		if (checkMessage(message)) {
			result += parseInt(message.split(',')[Math.floor(message.split(',').length / 2)]);
		}
	});

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
