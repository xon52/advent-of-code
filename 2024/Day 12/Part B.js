import { getFileData } from '../../helpers/index.js';
import { randomUUID } from 'crypto';

/*
type plot = {
  x: number,
  y: number,
  type: string
  areaId: number
  perimeterCount: number
}
*/

const processPlot = (x, y, visited, grid) => {
	const key = `${x},${y}`;
	if (visited.has(key)) return;

	const currentChar = grid[y][x];
	const neighbours = [
		{ x: x - 1, y: y }, // left
		{ x: x + 1, y: y }, // right
		{ x: x, y: y - 1 }, // up
		{ x: x, y: y + 1 }, // down
	];

	// Check if this is a perimeter plot
	let isPerimeter = false;
	let existingAreaId = null;

	for (const { x: nx, y: ny } of neighbours) {
		// Check bounds
		if (nx < 0 || ny < 0 || nx >= grid[0].length || ny >= grid.length) {
			isPerimeter = true;
			continue;
		}

		// Check different character neighbors
		if (grid[ny][nx] !== currentChar) {
			isPerimeter = true;
			continue;
		}

		// Check for existing areaId from same-type neighbors
		const neighbourKey = `${nx},${ny}`;
		if (visited.has(neighbourKey)) {
			const neighbour = visited.get(neighbourKey);
			if (neighbour.type === currentChar) {
				existingAreaId = neighbour.areaId;
			}
		}
	}

	// Create plot information
	const plotInfo = {
		x,
		y,
		type: currentChar,
		isPerimeter,
		areaId: existingAreaId || randomUUID(),
		perimeterSides: {},
	};

	// Add to visited set
	visited.set(key, plotInfo);

	// Recursively process matching neighbours
	for (const { x: nx, y: ny } of neighbours) {
		if (nx < 0 || ny < 0 || nx >= grid[0].length || ny >= grid.length) continue;
		if (!visited.has(`${nx},${ny}`) && grid[ny][nx] === currentChar) {
			processPlot(nx, ny, visited, grid);
		}
	}
};

const assignPerimeterSides = (x, y, visited, grid) => {
	const key = `${x},${y}`;
	if (!visited.get(key).isPerimeter) return;

	const currentPlot = visited.get(key);
	// console.log(`Assigning perimeter sides for plot at (${x}, ${y}):`, currentPlot);

	const northPlot = visited.get(`${x},${y - 1}`);
	const southPlot = visited.get(`${x},${y + 1}`);
	const eastPlot = visited.get(`${x + 1},${y}`);
	const westPlot = visited.get(`${x - 1},${y}`);

	// console.log(
	// 	`Neighbors - North: ${northPlot ? 'Exists' : 'None'}, South: ${southPlot ? 'Exists' : 'None'}, East: ${
	// 		eastPlot ? 'Exists' : 'None'
	// 	}, West: ${westPlot ? 'Exists' : 'None'}`
	// );

	if (northPlot?.type !== currentPlot.type) {
		if (westPlot?.type === currentPlot.type && westPlot?.perimeterSides?.north) {
			currentPlot.perimeterSides.north = westPlot.perimeterSides.north;
			// console.log(`Assigned north side from west plot: ${currentPlot.perimeterSides.north}`);
		} else {
			currentPlot.perimeterSides.north = randomUUID();
			// console.log(`Assigned new north side: ${currentPlot.perimeterSides.north}`);
		}
	}
	if (eastPlot?.type !== currentPlot.type) {
		if (northPlot?.type === currentPlot.type && northPlot?.perimeterSides?.east) {
			currentPlot.perimeterSides.east = northPlot.perimeterSides.east;
			// console.log(`Assigned east side from north plot: ${currentPlot.perimeterSides.east}`);
		} else {
			currentPlot.perimeterSides.east = randomUUID();
			// console.log(`Assigned new east side: ${currentPlot.perimeterSides.east}`);
		}
	}
	if (southPlot?.type !== currentPlot.type) {
		if (westPlot?.type === currentPlot.type && westPlot?.perimeterSides?.south) {
			currentPlot.perimeterSides.south = westPlot.perimeterSides.south;
			// console.log(`Assigned south side from west plot: ${currentPlot.perimeterSides.south}`);
		} else {
			currentPlot.perimeterSides.south = randomUUID();
			// console.log(`Assigned new south side: ${currentPlot.perimeterSides.south}`);
		}
	}
	if (westPlot?.type !== currentPlot.type) {
		if (northPlot?.type === currentPlot.type && northPlot?.perimeterSides?.west) {
			currentPlot.perimeterSides.west = northPlot.perimeterSides.west;
			// console.log(`Assigned west side from north plot: ${currentPlot.perimeterSides.west}`);
		} else {
			currentPlot.perimeterSides.west = randomUUID();
			// console.log(`Assigned new west side: ${currentPlot.perimeterSides.west}`);
		}
	}
};

const calculateFinalScore = (visited) => {
	const areas = new Map();

	// Organize plots by areaId
	for (const plot of visited.values()) {
		if (!areas.has(plot.areaId)) {
			areas.set(plot.areaId, {
				type: plot.type,
				plots: [],
				perimeterSides: new Set(),
				uniquePerimeterSideIds: new Set(),
			});
		}
		areas.get(plot.areaId).plots.push(plot);
		const perimeterSides = plot.perimeterSides;
		if (perimeterSides.north) areas.get(plot.areaId).uniquePerimeterSideIds.add(perimeterSides.north);
		if (perimeterSides.east) areas.get(plot.areaId).uniquePerimeterSideIds.add(perimeterSides.east);
		if (perimeterSides.south) areas.get(plot.areaId).uniquePerimeterSideIds.add(perimeterSides.south);
		if (perimeterSides.west) areas.get(plot.areaId).uniquePerimeterSideIds.add(perimeterSides.west);
	}

	let totalScore = 0;
	for (const area of areas.values()) {
		const score = area.uniquePerimeterSideIds.size * area.plots.length;
		// console.log(
		// 	`A region of ${area.type} plants with price ${area.uniquePerimeterSideIds.size} * ${area.plots.length} = ${score}`
		// );

		totalScore += score;
	}
	return totalScore;
};

const run = (puzzle) => {
	const grid = getFileData(import.meta, puzzle);
	const visited = new Map();

	// Step 1: Process each plot
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			processPlot(x, y, visited, grid);
		}
	}

	// Step 2: Assign perimeter sides
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			assignPerimeterSides(x, y, visited, grid);
		}
	}

	// Step 3: Calculate final score
	const totalScore = calculateFinalScore(visited);

	console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
	console.log(`     🎮 ${puzzle.toUpperCase()}: ${totalScore.toLocaleString().padEnd(16)} `);
	console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
};

run('sample');
run('puzzle');
