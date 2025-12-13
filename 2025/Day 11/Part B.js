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

	const findAllPaths = (current, target, visited = new Set(), hasDac = false, hasFft = false) => {
		// Prevent cycles - don't visit the same node twice in the same path
		if (visited.has(current)) {
			return 0;
		}

		// Update flags for dac and fft BEFORE checking if we're at target
		// This ensures we check the current node itself
		const newHasDac = hasDac || current === 'dac';
		const newHasFft = hasFft || current === 'fft';

		// If we've reached the target, check if both dac and fft were visited
		if (current === target) {
			return newHasDac && newHasFft ? 1 : 0;
		}

		// Mark current node as visited
		const newVisited = new Set(visited);
		newVisited.add(current);

		let count = 0;
		const neighbors = graph.get(current) || [];

		for (const neighbor of neighbors) {
			// Only explore if neighbor is not already in visited set
			if (!newVisited.has(neighbor)) {
				count += findAllPaths(neighbor, target, newVisited, newHasDac, newHasFft);
			}
		}

		return count;
	};

	// Find all paths from svr to out that visit both dac and fft
	const result = findAllPaths('svr', 'out');

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, result, `(${elapsedTime}ms)`);
};

run('sample2');
run('puzzle');
