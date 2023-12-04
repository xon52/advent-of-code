import { getFileData } from '../../helpers/index.js';

const splitNumbers = (str) =>
	str
		.split(': ')[1]
		.split(' | ')
		.map((e) => [...e.split(' ').filter((g) => g !== '')]);

const findMatches = (winningNumbers, myNumbers) => myNumbers.filter((e) => winningNumbers.includes(e));

const countCards = (results, index) => {
	if (results[index] === '') return 0;
	let cardCount = 0;
	cardCount += results[index];
	for (let i = index + 1; i < index + 1 + results[index]; i++) {
		cardCount += countCards(results, i);
	}
	return cardCount;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);

	const results = [];
	let cards = 0;

	// Get results
	data.map((card) => {
		const [winningNumbers, myNumbers] = splitNumbers(card);
		const matches = findMatches(winningNumbers, myNumbers);
		results.push(matches.length);
	});

	results.forEach((r, i) => {
		cards += countCards(results, i) + 1;
	});

	console.log(puzzle, cards);
};

run('sample');
run('puzzle');
