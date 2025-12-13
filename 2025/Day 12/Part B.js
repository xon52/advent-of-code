import { getFileData } from '../../helpers/index.js';

// Count the number of '#' cells in a shape
const countShapeCells = (shape) => {
	let count = 0;
	for (let r = 0; r < shape.length; r++) {
		for (let c = 0; c < shape[r].length; c++) {
			if (shape[r][c] === '#') count++;
		}
	}
	return count;
};

// Simple area check: count available spaces vs required spots
const canPack = (regionWidth, regionHeight, presents, shapes) => {
	// Count available spaces
	const availableSpaces = regionWidth * regionHeight;

	// Count required spots (all # cells from all required shapes)
	let requiredSpots = 0;
	for (let i = 0; i < presents.length; i++) {
		if (presents[i] > 0 && shapes[i]) {
			// Count cells in the original shape (all transformations have same cell count)
			const cellCount = countShapeCells(shapes[i]);
			requiredSpots += cellCount * presents[i];
		}
	}

	// If required spots don't exceed available spaces, they can fit
	return requiredSpots <= availableSpaces;
};

// Parse input
const parseInput = (data) => {
	const shapes = [];
	const regions = [];

	let i = 0;

	// Parse shapes
	while (i < data.length) {
		// Skip empty lines
		while (i < data.length && !data[i].trim()) {
			i++;
		}

		if (i >= data.length) break;

		// Check if this is a shape index line
		if (data[i].includes(':') && /^\d+:/.test(data[i])) {
			const shapeIndex = parseInt(data[i].split(':')[0]);
			i++; // Skip the index line

			const shape = [];
			// Read shape lines until we hit another index line or region line
			while (i < data.length && data[i].trim() && !data[i].includes('x') && !/^\d+:/.test(data[i])) {
				shape.push(data[i].split(''));
				i++;
			}

			shapes[shapeIndex] = shape;
		} else {
			// This should be a region line
			break;
		}
	}

	// Parse regions
	while (i < data.length) {
		if (data[i].trim()) {
			const match = data[i].match(/(\d+)x(\d+):\s*(.+)/);
			if (match) {
				const width = parseInt(match[1]);
				const height = parseInt(match[2]);
				const presents = match[3].split(/\s+/).map(Number);
				regions.push({ width, height, presents });
			}
		}
		i++;
	}

	return { shapes, regions };
};

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);
	const { shapes, regions } = parseInput(data);

	// Count regions that can fit all presents (simple area check)
	let count = 0;
	for (const region of regions) {
		if (canPack(region.width, region.height, region.presents, shapes)) {
			count++;
		}
	}

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, count, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
