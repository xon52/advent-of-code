import { getFileData, getFilePath } from '../../helpers/index.js';
import { rotate2DArrayClockwise, rotate2DArrayCounterClockwise } from '../../helpers/utils.js';

// Setup
const target = 'puzzle';
const data = getFileData(import.meta, target).map((d) => d.split(''));

// Roll O's North
const rollNorth = (arr) => {
	let changed = true;
	while (changed) {
		changed = false;
		for (let r = 0; r < arr.length; r++) {
			for (let c = 0; c < arr[0].length; c++) {
				if (arr[r][c] === 'O' && r > 0) {
					if (arr[r - 1][c] === '.') {
						arr[r - 1][c] = 'O';
						arr[r][c] = '.';
						changed = true;
					}
				}
			}
		}
	}
	return arr;
};

// Weigh O's from North
const weighFromNorth = (arr) => {
	let weight = 0;
	for (let r = 0; r < arr.length; r++) {
		for (let c = 0; c < arr[0].length; c++) {
			if (arr[r][c] === 'O') {
				weight += arr.length - r;
			}
		}
	}
	return weight;
};

// Get text from 2D array
const getTextFrom2DArray = (arr) => {
	return arr.map((row) => row.join('')).join('');
};

// Rotate and Roll
const rotateAndRoll = (arr) => {
	let _arr = structuredClone(arr);
	['N', 'W', 'S', 'E'].forEach((dir) => {
		// If North, just roll North
		// console.log(dir,'\n', getTextFrom2DArray(_arr));
		if (dir === 'N') {
			_arr = rollNorth(_arr);
		} else if (dir === 'W') {
			_arr = rotate2DArrayClockwise(_arr);
			_arr = rollNorth(_arr);
			_arr = rotate2DArrayCounterClockwise(_arr);
		} else if (dir === 'S') {
			_arr = rotate2DArrayCounterClockwise(_arr);
			_arr = rotate2DArrayCounterClockwise(_arr);
			_arr = rollNorth(_arr);
			_arr = rotate2DArrayClockwise(_arr);
			_arr = rotate2DArrayClockwise(_arr);
		} else if (dir === 'E') {
			_arr = rotate2DArrayCounterClockwise(_arr);
			_arr = rollNorth(_arr);
			_arr = rotate2DArrayClockwise(_arr);
		} else {
			throw new Error('Invalid direction', dir);
		}
		// console.log(dir,'\n', getTextFrom2DArray(_arr));
	});
	return _arr;
};

// ===========================================================
// PART 1
// ===========================================================
const rolledData1 = rollNorth(structuredClone(data));
const answer1 = weighFromNorth(rolledData1);
console.log('Part 1:', answer1);

// ===========================================================
// PART 2
// ===========================================================
const maxCycles = 1000000000;
let rolledData2 = structuredClone(data);
let pattern = [];
let history = new Array(100);
for (let cycle = 0; cycle < maxCycles; cycle++) {
	history[0] = getTextFrom2DArray(rolledData2);
	rolledData2 = rotateAndRoll(rolledData2);
	const str = getTextFrom2DArray(rolledData2);
	if (history.includes(str)) {
		const index = history.findIndex((h) => h === str);
		if (pattern.some((p) => p.str === str)) break;
		pattern.push({ index, cycle, str, weight: weighFromNorth(rolledData2) });
	}
	history.pop();
	history.unshift(pattern);
}
const patternStarts = pattern[0].cycle;
const patternLength = pattern.length;
const patternIndex = (maxCycles - patternStarts) % patternLength;

console.log('Part 2:', pattern[patternIndex-1].weight);
