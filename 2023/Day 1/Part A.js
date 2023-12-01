import fs from 'fs';
import path from 'path';
import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;
const dir = decodeURI(__dirname.slice(1));

const getData = (target) => {
	const text = fs.readFileSync(path.join(dir, `${target}.txt`), 'utf8');
	const rows = text.split(`\r\n`);
	return rows;
};

/**
 * Methods
 */

const getNumbers = (str) => str.replace(/[^0-9]/g, '');
const combineFirstAndLast = (arr) => `${arr[0]}${arr[arr.length - 1]}`;

/**
 * Run
 */

const run = (puzzle) => {
	const data = getData(puzzle);
	const numbers = data.map((e) => getNumbers(e));
	// console.log(numbers);
	const combined = numbers.map((e) => combineFirstAndLast(e));
	// console.log(combined);
	const result = combined.reduce((prev, curr) => +prev + +curr);
	console.log(puzzle, result);
};

run('sample');
run('puzzle');
