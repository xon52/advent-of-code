import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);
	const graph = new Map();

	// Populate the graph
	data.forEach((line) => {
		const [source, targetsStr] = line.split(': ');
		const targets = targetsStr.split(' ');
		graph.set(source, targets);
	});

	const findAllPaths = (current, target, visited = new Set(), path = []) => {
		if (current === target) {
			return 1;
		}
		let pathCount = 0;
		const neighbors = graph.get(current);

		for (const neighbor of neighbors) {
			pathCount += findAllPaths(neighbor, target, visited, [...path, current]);
		}

		return pathCount;
	};

	const result = findAllPaths('you', 'out');

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, result, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
