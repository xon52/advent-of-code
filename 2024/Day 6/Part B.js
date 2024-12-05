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

	const correctMessage = (message) => {
		const messageArr = message.split(',');
		const correctArr = [];
		let skip = false;
		for (let i = 0; i < messageArr.length; i++) {
			if (skip) {
				skip = false;
				continue;
			}
			if (i === messageArr.length - 1) {
				correctArr.push(messageArr[i]);
				break;
			}
			const current = messageArr[i];
			const next = messageArr[i + 1];
			if (numbers[current].after.indexOf(next) === -1) {
				skip = true;
				correctArr.push(next);
				correctArr.push(current);
			} else {
				correctArr.push(current);
			}
		}
		return correctArr.join(',');
	};

	let result = 0;
	messages.forEach((message) => {
		let correctedMessage = correctMessage(message);
		if (correctedMessage !== message) {
			while (correctedMessage !== correctMessage(correctedMessage)) {
				correctedMessage = correctMessage(correctedMessage);
			}
			// console.log(message, correctedMessage);
			result += parseInt(correctedMessage.split(',')[Math.floor(correctedMessage.split(',').length / 2)]);
		}
	});

	console.log(puzzle, result);
};

run('sample');
run('puzzle');
