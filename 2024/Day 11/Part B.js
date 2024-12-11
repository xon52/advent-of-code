import { getFileData } from '../../helpers/index.js';

// Example:
// 0123
// 1234
// 8765
// 9876
// Count the paths from 0 to 9

const findStarts = (grid) => {
	const starts = [];
	grid.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cell === '0') starts.push([x, y]);
		});
	});
	return starts;
};

const findNextSteps = (grid, start) => {
	const currentValue = parseInt(grid[start[1]][start[0]]);
	const nextSteps = [];

	const directions = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1],
	];
	for (const [dx, dy] of directions) {
		const newX = start[0] + dx;
		const newY = start[1] + dy;
		if (newX >= 0 && newY >= 0 && newX < grid[0].length && newY < grid.length) {
			const nextValue = parseInt(grid[newY][newX]);
			if (nextValue === currentValue + 1) {
				nextSteps.push([newX, newY]);
			}
		}
	}
	// console.log('nextSteps', JSON.stringify(nextSteps));
	return nextSteps;
};

const findPaths = (grid, start, currentPath = [start]) => {
	const paths = [];
	const nextSteps = findNextSteps(grid, start);

	nextSteps.forEach((nextStep) => {
		// Check if this step is already in our current path
		if (currentPath.some((step) => step[0] === nextStep[0] && step[1] === nextStep[1])) {
			return; // Skip if we've already visited this position
		}

		const newPath = [...currentPath, nextStep];
		if (grid[nextStep[1]][nextStep[0]] === '9') {
			// Check for exact path match (coordinates)
			if (!paths.some((existingPath) => JSON.stringify(existingPath) === JSON.stringify(newPath))) {
				paths.push(newPath);
			}
		} else {
			const newPaths = findPaths(grid, nextStep, newPath);
			// Only add paths with unique coordinates
			newPaths.forEach((path) => {
				if (!paths.some((existingPath) => JSON.stringify(existingPath) === JSON.stringify(path))) {
					paths.push(path);
				}
			});
		}
	});
	return paths;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const grid = data.map((row) => row.split(''));
	const starts = findStarts(grid);

	const paths = [];
	starts.forEach((start) => {
		const newPaths = findPaths(grid, start);
		paths.push(...newPaths);
	});
	console.log(paths.length);
};

run('sample');
run('puzzle');
