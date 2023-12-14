import { getFileData } from '../../helpers/index.js';
import { getDifferencesCount, transpose2DArray } from '../../helpers/utils.js';
const target = 'puzzle';
const data = [];
let dataRow = 0;

// Get data
getFileData(import.meta, target).forEach((d) => {
	if (d === '') {
		dataRow++;
	} else {
		if (!data[dataRow]) data.push([]);
		data[dataRow].push(d);
	}
});

// Parse a 2d array
const parse2d = (input) => input.map((row) => row.split(''));

/** Returns the the row where the reflection happens, and the total differences = smudge */
function getReflection(grid, smudge) {
	rLoop: for (let r = 0; r < grid.length - 1; r++) {
		let diffs = getDifferencesCount(grid[r], grid[r + 1]);
		if (diffs <= smudge) {
			const rowsBelow = r;
			const rowsAbove = grid.length - r;
			for (let i = 0; i < Math.min(rowsBelow, rowsAbove); i++) {
				const lowRow = r - i - 1;
				const highRow = r + 2 + i;
				if (lowRow < 0 || highRow >= grid.length) break;
				diffs += getDifferencesCount(grid[lowRow], grid[highRow]);
				if (diffs > smudge) continue rLoop;
			}
			if (diffs === smudge) return r + 1;
		}
	}
	return 0;
}

// ===========================================================
// PART 1
// ===========================================================
let answer1 = 0;
for (const gridInput of data) {
	const grid = parse2d(gridInput);
	const transposed = transpose2DArray(grid);
	const vertical = getReflection(transposed, 0);
	const horizontal = getReflection(grid, 0);
	answer1 += 100 * horizontal + vertical;
}
console.log('Part 1:', answer1);

// ===========================================================
// PART 2
// ===========================================================
let answer2 = 0;
for (const gridInput of data) {
	const grid = parse2d(gridInput);
	const transposed = transpose2DArray(grid);
	const vertical = getReflection(transposed, 1);
	const horizontal = getReflection(grid, 1);
	answer2 += 100 * horizontal + vertical;
}
console.log('Part 2:', answer2);
