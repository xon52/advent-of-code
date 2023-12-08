import { getFileData } from '../../helpers/index.js';

const run = (target) => {
	const data = getFileData(import.meta, target);

	const instructions = data[0].split('').map((e) => (e === 'R' ? 1 : 0));
	const map = {};
	data.slice(2).forEach((e) => (map[e.slice(0, 3)] = [e.slice(7, 10), e.slice(12, 15)]));

	const start = 'AAA';
	const end = 'ZZZ';
	let current = start;
	let steps = 0;

	while (current !== end) {
		for (let i = 0; i < instructions.length; i++) {
			steps++;
			current = map[current][instructions[i]];
			if (current === end) break;
		}
	}

	const result = steps;
	console.log(target, result);
};

// run('sample');
run('puzzle')
