import { getFileData } from '../../helpers/index.js';

const costA = 3;
const costB = 1;
const maxPresses = 100;

/*
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279
*/

const findMultiples = (target, aValue, bValue) => {
	const aMultiples = [];
	const bMultiples = [];

	for (let i = 0; i <= maxPresses; i++) {
		for (let j = 0; j <= maxPresses; j++) {
			if (i * aValue + j * bValue === target) {
				aMultiples.push(i);
				bMultiples.push(j);
			}
		}
	}

	return { aMultiples, bMultiples };
};

const findCombinations = (target, buttonA, buttonB) => {
	const xMultiples = findMultiples(target.x, buttonA.x, buttonB.x);
	const yMultiples = findMultiples(target.y, buttonA.y, buttonB.y);

	// Find matching combinations between x and y multiples
	const matchingMultiples = [];
	for (let i = 0; i < xMultiples.aMultiples.length; i++) {
		for (let j = 0; j < yMultiples.aMultiples.length; j++) {
			if (
				xMultiples.aMultiples[i] === yMultiples.aMultiples[j] &&
				xMultiples.bMultiples[i] === yMultiples.bMultiples[j]
			) {
				matchingMultiples.push({
					aCount: xMultiples.aMultiples[i],
					bCount: xMultiples.bMultiples[i],
					cost: xMultiples.aMultiples[i] * costA + xMultiples.bMultiples[i] * costB,
				});
			}
		}
	}

	return matchingMultiples;
};

const findCheapestCombination = (combinations) => {
	return combinations.reduce((min, current) => (current.cost < min.cost ? current : min), combinations[0]);
};

const extractNumbers = (str) => {
	const match = str.match(/X=(\d+), Y=(\d+)/) || str.match(/X\+(\d+), Y\+(\d+)/);
	return match ? { x: parseInt(match[1]), y: parseInt(match[2]) } : null;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle, true)
		.split('\r\n\r\n')
		.map((game) => game.split('\r\n'));
	const games = [];
	data.forEach((data) => {
		games.push({
			buttonA: extractNumbers(data[0]),
			buttonB: extractNumbers(data[1]),
			prize: extractNumbers(data[2]),
		});
	});

	let totalCost = 0;

	games.forEach((game) => {
		const combinations = findCombinations(game.prize, game.buttonA, game.buttonB);
		const cheapest = findCheapestCombination(combinations);
		totalCost += cheapest?.cost || 0;
	});

	console.log(totalCost);
};

run('sample');
run('puzzle');
