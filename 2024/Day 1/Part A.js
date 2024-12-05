import { getFileData } from '../../helpers/index.js';

/*
Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number
Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances. 
*/

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	let left = [];
	let right = [];
	data.forEach((line) => {
		const [l, r] = line.split('   ');
		left.push(+l);
		right.push(+r);
	});
	left.sort((a, b) => a - b);
	right.sort((a, b) => a - b);
	const distancesApart = left.map((l, i) => Math.abs(l - right[i]));
	const result = distancesApart.reduce((n, c) => n + c, 0);
	console.log(result);
};

run('sample');
run('puzzle');
