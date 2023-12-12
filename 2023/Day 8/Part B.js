import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { getFileData } from '../../helpers/index.js';

const greatestCommonDivisor = (a, b) => (b ? greatestCommonDivisor(b, a % b) : a);
const leastCommonMultiple = (a, b) => (a * b) / greatestCommonDivisor(a, b);

const target = 'puzzle';
const data = getFileData(import.meta, target);

const instructions = data[0].split('').map((e) => (e === 'R' ? 1 : 0));
const map = {};
data.slice(2).forEach((e) => (map[e.slice(0, 3)] = [e.slice(7, 10), e.slice(12, 15)]));

if (isMainThread) {
	let currents = Object.keys(map).filter((e) => e[2] === 'Z');
	let steps = new Array(currents.length).fill(0);

	for (let n = 0; n < currents.length; n++) {
		const worker = new Worker(`./2023/Day 8/Part B.js`, { workerData: { start: currents[n] } });
		worker.on('message', (step) => {
			steps[n] = step;
			if (steps.every((s) => s !== 0)) {
				const result = steps.reduce((a, b) => leastCommonMultiple(a, b), 1);
				console.log(target, result);
			}
		});
		worker.on('error', (err) => console.error(err));
		worker.on('exit', (code) => {});
	}
} else {
	// Worker thread - find steps
	const { start } = workerData;
	let current = start;
	let step = 0;
	while (current[2] !== 'A') {
		for (let i = 0; i < instructions.length; i++) {
			step++;
			current = map[current][instructions[i]];
			if (current[2] === 'A') break;
		}
	}
	// console.log(start, current, step);
	parentPort.postMessage(step);
}
