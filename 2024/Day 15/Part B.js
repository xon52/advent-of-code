import { getFileData } from '../../helpers/index.js';

/*
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<

@ = start position
O = movable box
# = wall
*/

const resizeMap = (map) => {
	const newMap = [];
	for (let y = 0; y < map.length; y++) {
		const row = [];
		for (let x = 0; x < map[y].length; x++) {
			const tile = map[y][x];
			if (tile === '#') {
				row.push('#', '#');
			} else if (tile === 'O') {
				row.push('[', ']');
			} else if (tile === '.') {
				row.push('.', '.');
			} else if (tile === '@') {
				row.push('@', '.');
			}
		}
		newMap.push(row);
	}
	return newMap;
};

const directions = {
	'^': [0, -1],
	'>': [1, 0],
	v: [0, 1],
	'<': [-1, 0],
};

const pushBox = (map, boxPosition, direction, test = false) => {
	const [x, y] = boxPosition;
	const [dx, dy] = directions[direction];

	if (test) {
		if (dx < 0) {
			// moving left
			if (map[y][x - 1] === '#') return false;
			if (map[y][x - 2] === '.') return true;
			if (map[y][x - 2] === ']') return pushBox(map, [x - 2, y], direction, true);
		} else if (dx > 0) {
			// moving right
			if (map[y][x + 1] === '#') return false;
			if (map[y][x + 2] === '.') return true;
			if (map[y][x + 2] === '[') return pushBox(map, [x + 2, y], direction, true);
		} else if (dy < 0) {
			// moving up
			if (map[y - 1][x] === '[') {
				if (map[y - 2][x] === '#') return false;
				if (map[y - 2][x + 1] === '#') return false;
				if (map[y - 2][x] === '.' && map[y - 2][x + 1] === '.') return true;

				// I'm here if this is ever picked up again
			}
		}
	}
};

const findStartPosition = (map) => {
	const startRow = map.findIndex((row) => row.includes('@'));
	const startColumn = map[startRow].indexOf('@');
	return [startColumn, startRow];
};

const displayMap = (map, message) => {
	if (message) console.log(message);
	console.log(map.map((row) => row.join('')).join('\n'));
	console.log('\n');
};

const move = (map, direction) => {
	const [x, y] = findStartPosition(map);
	const [dx, dy] = directions[direction];
	const newPosition = [x + dx, y + dy];
	const newPositionValue = map[newPosition[1]][newPosition[0]];
	if (newPositionValue === '#') return;
	if (newPositionValue === '[' || newPositionValue === ']') {
		if (pushBox(map, newPosition, direction, true)) {
			pushBox(map, newPosition, direction);
		} else return;
	}
	map[y][x] = '.';
	map[newPosition[1]][newPosition[0]] = '@';
};

const calculateBoxPositionValues = (map) => {
	const boxPositions = [];
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === 'O') boxPositions.push([x, y]);
		}
	}
	const values = boxPositions.reduce((acc, [x, y]) => {
		acc.push(x + y * 100);
		return acc;
	}, []);
	return values.reduce((acc, value) => acc + value, 0);
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle, true);
	const [_map, _instructions] = data.split('\r\n\r\n');
	const map = resizeMap(_map.split('\r\n').map((row) => row.split('')));
	const instructions = _instructions.split('\r\n').join('');
	instructions.split('').forEach((instruction) => {
		move(map, instruction);
		displayMap(map, instruction);
	});
	console.log(calculateBoxPositionValues(map));
};

run('sample3');
// run('puzzle');
