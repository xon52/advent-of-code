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

const visit = (x, y, visited, grid) => {
	const key = `${x},${y}`;
	if (visited.has(key)) return;

	const currentChar = grid[y][x];
	const neighbours = [
		{ x: x - 1, y: y }, // left
		{ x: x + 1, y: y }, // right
		{ x: x, y: y - 1 }, // up
		{ x: x, y: y + 1 }, // down
	];

	let perimeterCount = 0;
	let existingAreaId = null;

	// Check all neighbours
	for (const neighbour of neighbours) {
		const { x: nx, y: ny } = neighbour;
		const neighbourKey = `${nx},${ny}`;

		// If neighbour is out of bounds, count it as perimeter
		if (nx < 0 || ny < 0 || nx >= grid[0].length || ny >= grid.length) {
			perimeterCount++;
			continue;
		}

		const neighbourChar = grid[ny][nx];

		// Count different characters as perimeter
		if (neighbourChar !== currentChar) {
			perimeterCount++;
		}

		// Check if neighbour has been visited and has an areaId
		if (visited.has(neighbourKey)) {
			const visitedInfo = visited.get(neighbourKey);
			if (visitedInfo.areaId && visitedInfo.type === currentChar) {
				existingAreaId = visitedInfo.areaId;
			}
		}
	}

	// Create plot information
	const plotInfo = {
		x,
		y,
		type: currentChar,
		perimeterCount,
		areaId: existingAreaId || randomUUID(),
	};

	// Add to visited set
	visited.set(key, plotInfo);

	// Recursively visit matching neighbours
	for (const neighbour of neighbours) {
		const { x: nx, y: ny } = neighbour;
		const neighbourKey = `${nx},${ny}`;

		if (nx < 0 || ny < 0 || nx >= grid[0].length || ny >= grid.length) continue;

		if (!visited.has(neighbourKey) && grid[ny][nx] === currentChar) {
			visit(nx, ny, visited, grid);
		}
	}
};

const processAreas = (visited) => {
	// Group entries by areaId
	const areas = new Map();

	// First pass: group by areaId
	for (const [_, plot] of visited) {
		if (!areas.has(plot.areaId)) {
			areas.set(plot.areaId, {
				type: plot.type,
				count: 0,
				totalPerimeter: 0,
			});
		}

		const area = areas.get(plot.areaId);
		area.count++;
		area.totalPerimeter += plot.perimeterCount;
	}

	// Second pass: calculate score for each area
	const scores = [];
	for (const [areaId, area] of areas) {
		const score = area.totalPerimeter * area.count;
		scores.push({
			areaId,
			type: area.type,
			count: area.count,
			perimeter: area.totalPerimeter,
			score,
		});
	}

	return scores;
};

const run = (puzzle) => {
	const grid = getFileData(import.meta, puzzle);
	const visited = new Map();

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			visit(x, y, visited, grid);
		}
	}

	const scores = processAreas(visited);
	console.log('Area Scores:', JSON.stringify(scores));
	// If you need the total of all scores:
	const totalScore = scores.reduce((sum, area) => sum + area.score, 0);
	console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
	console.log(`     🎮 ${puzzle.toUpperCase()}: ${totalScore.toLocaleString().padEnd(16)} `);
	console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
};

run('sample');
run('puzzle');
