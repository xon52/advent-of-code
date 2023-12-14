/**
 * Get the number of differences between two arrays or strings.
 * @param {string | string[]} a
 * @param {string | string[]} b
 * @returns {number}
 */
export const getDifferencesCount = (a, b) => {
	let diffs = 0;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) diffs++;
	}
	return diffs;
};

/**
 * Transpose a 2d array
 * @param {any[][]} matrix
 * @returns {any[][]}
 */
export const transpose2DArray = (matrix) => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

/**
 * Rotate a 2d array clockwise
 * @param {any[][]} matrix
 * @returns {any[][]}
 */
export const rotate2DArrayClockwise = (matrix) => {
	const result = [];
	for (let c = 0; c < matrix[0].length; c++) {
		result.push([]);
		for (let r = matrix.length - 1; r >= 0; r--) {
			result[c].push(matrix[r][c]);
		}
	}
	return result;
};

/**
 * Rotate a 2d array counter-clockwise
 * @param {any[][]} matrix
 * @returns {any[][]}
 */
export const rotate2DArrayCounterClockwise = (matrix) => {
	const result = [];
	for (let c = matrix[0].length - 1; c >= 0; c--) {
		result.push([]);
		for (let r = 0; r < matrix.length; r++) {
			result[matrix[0].length - c - 1].push(matrix[r][c]);
		}
	}
	return result;
};
