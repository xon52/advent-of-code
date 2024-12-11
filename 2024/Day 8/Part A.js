import { getFileData } from '../../helpers/index.js';

/*
Example data:
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............

*/

const alreadyContains = (array, item) => {
	return array.some((e) => e[0] === item[0] && e[1] === item[1]);
};

const isInBounds = (x, y, grid) => {
	const rows = grid.length;
	const cols = grid[0].length;
	return x >= 0 && x < rows && y >= 0 && y < cols;
};

// [[0,11],[3,2],[5,6],[7,0],[1,3],[4,9],[0,6],[6,3],[2,10],[5,1],[2,4],[11,10],[7,7],[10,10]]
const cleanAntinodes = (antinodes, grid) => {
	const cleaned = [];
	antinodes.forEach((e) => {
		if (isInBounds(e[0], e[1], grid) && !alreadyContains(cleaned, e)) cleaned.push(e);
	});
	return cleaned;
};

// [[0,11],[3,2],[-1,9],[5,6],[-2,12],[7,0],[1,3],[4,9],[0,6],[6,3],[2,10],[5,1],[2,4],[11,10],[1,3],[13,12],[7,7],[10,10]]
const getAntinodes = (groupedAntennaPairs, grid) => {
	const antinodes = [];
	groupedAntennaPairs.forEach(([a, b]) => {
		const [x1, y1] = a;
		const [x2, y2] = b;
		const dx = Math.abs(x1 - x2);
		const dy = Math.abs(y1 - y2);
		const x3 = x1 > x2 ? x1 + dx : x1 - dx;
		const y3 = y1 > y2 ? y1 + dy : y1 - dy;
		const x4 = x2 > x1 ? x2 + dx : x2 - dx;
		const y4 = y2 > y1 ? y2 + dy : y2 - dy;
		antinodes.push([x3, y3], [x4, y4]);
	});
	return antinodes;
};

// [[[1,8],[2,5]],[[1,8],[3,7]],[[1,8],[4,4]],[[2,5],[3,7]],[[2,5],[4,4]],[[3,7],[4,4]],[[5,6],[8,8]],[[5,6],[9,9]],[[8,8],[9,9]]]
const getGroupedAntennaPairs = (groupedAntennaLocations) => {
	const pairs = [];
	Object.entries(groupedAntennaLocations).forEach(([antenna, locations]) => {
		for (let i = 0; i < locations.length; i++) {
			for (let j = i + 1; j < locations.length; j++) {
				pairs.push([locations[i], locations[j]]);
			}
		}
	});
	return pairs;
};

// {"0":[[1,8],[2,5],[3,7],[4,4]],"A":[[5,6],[8,8],[9,9]]}
const getGroupedAntennaLocations = (grid) => {
	const groupedAntennaLocations = {};
	grid.forEach((row, r) => {
		row.forEach((cell, c) => {
			if (cell !== '.') {
				groupedAntennaLocations[cell] = groupedAntennaLocations[cell] || [];
				groupedAntennaLocations[cell].push([r, c]);
			}
		});
	});
	return groupedAntennaLocations;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const grid = data.map((line) => line.split(''));
	const groupedAntennaLocations = getGroupedAntennaLocations(grid);
	const groupedAntennaPairs = getGroupedAntennaPairs(groupedAntennaLocations);
	const antinodes = getAntinodes(groupedAntennaPairs, grid);
	const cleanedAntinodes = cleanAntinodes(antinodes, grid);

	const newGrid = JSON.parse(JSON.stringify(grid));
	cleanedAntinodes.forEach((e) => {
		newGrid[e[0]][e[1]] = '#';
	});
	console.log('newGrid', '\n' + newGrid.map((row) => row.join('')).join('\n'));

	const result = cleanedAntinodes.length;
	console.log(puzzle, result);
};

run('sample');
run('puzzle');
