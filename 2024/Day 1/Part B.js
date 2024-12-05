import { getFileData } from '../../helpers/index.js';

/*
Calculate a total similarity score by adding up each number in the left list after multiplying it by the number of times that number appears in the right list.
*/

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	// let left = [];
	// let right = [];
	// data.forEach((line) => {
	// 	const [l, r] = line.split('   ');
	// 	left.push(+l);
	// 	right.push(+r);
	// });
	// left.sort((a, b) => a - b);
	// right.sort((a, b) => a - b);

	const leftCount = {};
	const rightCount = {};

	// left.forEach((_, i) => {
	// 	// Left
	// 	if (leftCount[left[i]]) {
	// 		leftCount[left[i]] += 1;
	// 	} else {
	// 		leftCount[left[i]] = 1;
	// 	}
	// 	// Right
	// 	if (rightCount[right[i]]) {
	// 		rightCount[right[i]] += 1;
	// 	} else {
	// 		rightCount[right[i]] = 1;
	// 	}
	// });

	data.forEach((line) => {
		const [l, r] = line.split('   ');
		leftCount[l] = (leftCount[l] || 0) + 1;
		rightCount[r] = (rightCount[r] || 0) + 1;
	});

	let result = 0;

	Object.keys(leftCount).forEach((key) => {
		if (rightCount[key]) {
			result += +key * leftCount[key] * rightCount[key];
		}
	});

	console.log(result);
};

run('sample');
run('puzzle');
