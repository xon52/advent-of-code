import { getFileData } from '../../helpers/index.js';

/*
Stones are arranged in a straight line and each stone has a number
If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
No matter how the stones change, their order is preserved, and they stay on their perfectly straight line.
 
If you have an arrangement of five stones engraved with the numbers 0 1 10 99 999 and you blink once, the stones transform as follows:
The first stone, 0, becomes a stone marked 1.
The second stone, 1, is multiplied by 2024 to become 2024.
The third stone, 10, is split into a stone marked 1 followed by a stone marked 0.
The fourth stone, 99, is split into two stones marked 9.
The fifth stone, 999, is replaced by a stone marked 2021976.
So, after blinking once, your five stones would become an arrangement of seven stones engraved with the numbers 1 2024 1 0 9 9 2021976.
*/

const blink = (stones) => {
	const newStones = [];
	stones.forEach((stone) => {
		if (stone === 0) {
			newStones.push(1);
		} else if (stone.toString().length % 2 === 0) {
			const str = stone.toString();
			const half = Math.floor(str.length / 2);
			newStones.push(Number(str.slice(0, half)));
			newStones.push(Number(str.slice(half)));
		} else {
			newStones.push(stone * 2024);
		}
	});
	return newStones;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	let stones = data[0].split(' ').map(Number);
	const n = 25;

	for (let i = 0; i < n; i++) {
		stones = blink(stones);
	}
	console.log(puzzle, stones.length);
};

run('sample');
run('puzzle');
