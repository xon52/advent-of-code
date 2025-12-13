import { getFileData } from '../../helpers/index.js';

const costA = 3;
const costB = 1;

/*
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=10000000008400, Y=10000000005400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=10000000012748, Y=10000000012176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=10000000007870, Y=10000000006450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=10000000018641, Y=10000000010279
*/

const findMultiples = (target, aValue, bValue) => {
	const aMultiples = [];
	const bMultiples = [];

	// Calculate the maximum possible multiples for aValue and bValue
	const maxAMultiples = Math.floor(target / aValue);
	const maxBMultiples = Math.floor(target / bValue);

	for (let i = 0; i <= maxAMultiples; i++) {
		const remaining = target - i * aValue;
		if (remaining < 0) break; // No need to continue if remaining is negative

		// Check if remaining can be exactly divided by bValue
		if (remaining % bValue === 0) {
			const j = remaining / bValue;
			aMultiples.push(i);
			bMultiples.push(j);
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

run('sample2');
run('puzzle');
