import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { getFileData, getFilePath } from '../../helpers/index.js';

const findHorizontalMirror = (arr) => {
	// Candidates to check
	const candidates = [];
	// Find candidates
	for (let i = 0; i < arr.length - 1; i++) {
		if (arr[i].join('') === arr[i + 1].join('')) candidates.push(i);
	}
	// Check candidates
	const results = [];
	candidates.forEach((c) => {
		const _top = arr.slice(0, c + 1);
		const _bottom = arr.slice(c + 1);
		const min = Math.min(_top.length, _bottom.length);
		const top = _top.reverse().slice(0, min);
		const bottom = _bottom.slice(0, min);
		if (top.every((e, i) => e.join('') === bottom[i].join(''))) results.push(c);
	});
	return results;
};

const transpose = (matrix) => matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

/**
 * Main Thread
 */
if (isMainThread) {
	// Setup
	const target = 'puzzle';
	const data = [];
	let dataRow = 0;
	getFileData(import.meta, target).forEach((d) => {
		if (d === '') {
			dataRow++;
		} else {
			if (!data[dataRow]) data.push([]);
			data[dataRow].push(d);
		}
	});

	let results = [];
	// Split work
	data.forEach((_arr, index) => {
		const arr = _arr.map((e) => e.split(''));
		const worker = new Worker(getFilePath(import.meta), { workerData: { arr } });
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
	/**
	 * Worker Thread
	 */
	const { arr } = workerData;
	let result = 0;
	const horizontalMirrors = findHorizontalMirror(arr);
	const verticalMirrors = findHorizontalMirror(transpose(arr));
	horizontalMirrors.forEach((h) => (result += (h + 1) * 100));
	verticalMirrors.forEach((v) => (result += v + 1));
	parentPort.postMessage(result);
}
