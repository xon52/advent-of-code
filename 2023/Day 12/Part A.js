import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { getFileData, getFilePath } from '../../helpers/index.js';

// Special Custom Permutations Func
const getPermutationsSet = (arr, length) => {
	let uniquePermutations = new Set();

	const _addPerm = (s) => {
		// Add trailing .'s
		for (let j = s.length; j < length; j++) s += '.';
		uniquePermutations.add(s);
	};
	for (let i = 0; i < length; i++) {
		let _arr = '';
		// Add preceding .'s
		for (let j = 0; j < i; j++) _arr += '.';
		// Add block
		_arr += arr[0];
		// Add . + next permutation if not last
		if (arr.length > 1) {
			_arr += '.';
			getPermutationsSet(arr.slice(1), length - _arr.length).forEach((e) => {
				_addPerm(_arr + e);
			});
		} else {
			_addPerm(_arr);
		}
	}
	return uniquePermutations;
};

// Test if input matches given arrangement
const matchesArrangement = (str, arrangement) => {
	for (let a = 0; a < str.length; a++) {
		if (arrangement[a] === '?') continue;
		if (arrangement[a] !== str[a]) return false;
	}
	return true;
};
// Test if input matches given conditions
const matchesConditions = (str, conditions) =>
	str
		.replaceAll('.', ' ')
		.trim()
		.split(' ')
		.filter((e) => e !== '')
		.map((e) => e.length)
		.every((e, i) => conditions[i] - e === 0);

if (isMainThread) {
	// Setup
	const target = 'puzzle';
	const data = getFileData(import.meta, target);
	let results = [];
	// Split work
	data.forEach((row, index) => {
		const [arrangement, condition] = row.split(' ');
		const conditions = condition.split(',').map((e) => +e);
		const worker = new Worker(getFilePath(import.meta), { workerData: { arrangement, conditions, index } });
		worker.on('message', (res) => {
			console.log('Worker', index, 'done:', res);
			results.push(res);
			if (results.length === data.length) {
				const result = results.reduce((p, c) => p + c, 0);
				console.log('-----------------');
				console.log(target, result);
			}
		});
		worker.on('error', (err) => console.error(err));
		worker.on('exit', (code) => {});
	});
} else {
	// Worker thread - find steps
	const { arrangement, conditions, index } = workerData;
	let result = 0;

	// Split out unknown clusters to test
	const unknownConditionPositions = [];
	arrangement.split('').forEach((a, i) => {
		if (a === '?') unknownConditionPositions.push(i);
	});

	const clusters = conditions.map((e) => new Array(e).fill('#').join(''));
	const allPossiblePermutations = getPermutationsSet(clusters, arrangement.length);

	// Test each combination
	allPossiblePermutations.forEach((str) => {
		// console.log(str, str.length, arrangement, arrangement.length, matchesArrangement(str, arrangement));
		if (!matchesArrangement(str, arrangement)) return;
		if (!matchesConditions(str, conditions)) return;
		result++;
	});

	parentPort.postMessage(result);
}
