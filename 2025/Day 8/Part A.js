import { getFileData } from '../../helpers/index.js';

const run = (puzzle, limit) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);
	let circuitCount = 0;
	const positions = data.map((row) => {
		const [x, y, z] = row.split(',').map(Number);
		circuitCount++;
		return { name: `${x}-${y}-${z}`, x, y, z, circuitId: circuitCount };
	});

	const getDistance = (p1, p2) => {
		return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 + (p2.z - p1.z) ** 2);
	}

	const mergeCircuits = (p1, p2) => {
		if (p1.circuitId === p2.circuitId) return false;
		const newCircuitId = p2.circuitId;
		for (const pos of positions) {
			if (pos.circuitId === newCircuitId) {
				pos.circuitId = p1.circuitId;
			}
		}

		return true;
	}

	// Find all pairs and sort by distance
	const pairs = [];
	for (let i = 0; i < positions.length; i++) {
		for (let j = i + 1; j < positions.length; j++) {
			pairs.push({
				p1: positions[i],
				p2: positions[j],
				distance: getDistance(positions[i], positions[j])
			});
		}
	}

	pairs.sort((a, b) => a.distance - b.distance);

	// Process the 10 shortest pairs (even if already connected)
	for (let i = 0; i < limit; i++) {
		mergeCircuits(pairs[i].p1, pairs[i].p2);
	}

	// Count circuit sizes
	const circuitSizes = new Map();
	for (const { circuitId } of positions) {
		circuitSizes.set(circuitId, (circuitSizes.get(circuitId) || 0) + 1);
	}

	// Find 3 largest circuit sizes and multiply them together
	const result = Array.from(circuitSizes.values())
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((p, c) => p * c, 1);

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, result, `(${elapsedTime}ms)`);
};

run('sample', 10);
run('puzzle', 1000);
