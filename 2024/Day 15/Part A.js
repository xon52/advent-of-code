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

const directions = {
	'^': [0, -1],
	'>': [1, 0],
	v: [0, 1],
	'<': [-1, 0],
};

const pushBox = (map, boxPosition, direction, test = false) => {
	const [x, y] = boxPosition;
	const [dx, dy] = directions[direction];
	const newPosition = [x + dx, y + dy];
	let newPositionValue = map[newPosition[1]][newPosition[0]];
	if (test) {
		if (newPositionValue === '#') return false;
		if (newPositionValue === '.') return true;
		if (newPositionValue === 'O') return pushBox(map, newPosition, direction, test);
	} else {
		if (newPositionValue === '#') throw new Error('Wall in the way');
		map[y][x] = '.';
		if (newPositionValue === 'O') pushBox(map, newPosition, direction);
		newPositionValue = map[newPosition[1]][newPosition[0]];
		if (newPositionValue === '.') map[newPosition[1]][newPosition[0]] = 'O';
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
	if (newPositionValue === 'O') {
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
	const map = _map.split('\r\n').map((row) => row.split(''));
	const instructions = _instructions.split('\r\n').join('');
	instructions.split('').forEach((instruction) => {
		move(map, instruction);
		// displayMap(map, instruction);
	});
	console.log(calculateBoxPositionValues(map));
};

run('sample');
run('sample2');
run('puzzle');
