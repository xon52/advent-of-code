import { getFileData } from '../../helpers/index.js';

const re = /(one|two|three|four|five|six|seven|eight|nine|[0-9])/g;

const textToDigit = (txt) => {
	if (txt.match(/^([0-9])$/g)) return +txt;
	if (txt === 'one') return 1;
	if (txt === 'two') return 2;
	if (txt === 'three') return 3;
	if (txt === 'four') return 4;
	if (txt === 'five') return 5;
	if (txt === 'six') return 6;
	if (txt === 'seven') return 7;
	if (txt === 'eight') return 8;
	if (txt === 'nine') return 9;
	throw new Error(`textToDigit could not interpret ${txt}`);
};

const getFirstNumber = (str) => {
	for (let i = 0; i < str.length + 1; i++) {
		const match = str.substring(0, i).match(re);
		if (match) return textToDigit(match[0]);
	}
};

const getLastNumber = (str) => {
	for (let i = str.length - 1; i > -1; i--) {
		const match = str.substring(i).match(re);
		if (match) return textToDigit(match[0]);
	}
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const firstAndLast = data.map((e) => `${getFirstNumber(e)}${getLastNumber(e)}`);
	const result = firstAndLast.reduce((prev, curr) => +prev + +curr, 0);
	console.log(puzzle, result);
};

run('sample2');
run('puzzle');
