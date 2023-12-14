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
