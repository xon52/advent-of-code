import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { getFileData, getFilePath } from '../../helpers/index.js';

const target = 'puzzle';
const data = getFileData(import.meta, target);
let results = [];

if (isMainThread) {
	for (let r = 0; r < data.length; r++) {
		const initRow = data[r].split(' ').map((e) => +e);
		const worker = new Worker(getFilePath(import.meta), { workerData: { initRow } });
		worker.on('message', (res) => {
			console.log('Worker', r, 'done:', res);
			results.push(res);
			if (results.length === data.length) {
				const result = results.reduce((p, c) => p + c, 0);
				console.log('-----------------');
				console.log(target, result);
			}
		});
		worker.on('error', (err) => console.error(err));
		worker.on('exit', (code) => {});
	}
} else {
	// Worker thread - find steps
	const { initRow } = workerData;
	const rows = [];
	rows.push([...initRow]);

	// Populate rows until all zero
	let done = false;
	let curRow = 0;
	while (!done) {
		const row = rows[curRow];
		curRow++;
		rows[curRow] = [];
		for (let col = 1; col < row.length; col++) {
			rows[curRow].push(row[col] - row[col - 1]);
		}
		if (rows[curRow].every((e) => e === 0)) done = true;
	}

	// Work backwards on first column
	let result = 0;
	for (let c = rows.length - 1; c > 0; c--) {
		result = rows[c - 1][0] - result;
	}
	parentPort.postMessage(result);
}
