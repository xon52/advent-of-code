import { getFileData } from '../../helpers/index.js';

/*
Example data:
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20

Each line represents a single equation.
The test value appears before the colon on each line.
Determine whether the remaining numbers can be combined with operators to produce the test value.

*/
const operators = ['+', '*'];
const operatorsMap = {
	'+': (a, b) => a + b,
	'*': (a, b) => a * b,
};
const generateCombinationsArray = (bits) => {
	const length = bits.length - 1;
	const combinations = [];

	// Generate all possible operator combinations
	for (let i = 0; i < operators.length ** length; i++) {
		const combination = [];
		let num = i;

		// Convert number to base-2 (since we have 2 operators)
		for (let j = 0; j < length; j++) {
			combination.unshift(operators[num % operators.length]);
			num = Math.floor(num / operators.length);
		}

		// Only add combinations that have the correct length
		if (combination.length === length) {
			combinations.push(combination);
		}
	}

	return combinations;
};
const getLowestAnswer = (bits) => {
	return bits.reduce((acc, bit) => operatorsMap['+'](acc, bit), 0);
};
const getHighestAnswer = (bits) => {
	return bits.reduce((acc, bit) => operatorsMap['*'](acc, bit), 1);
};
const getAnswer = (equation) => {
	const combinations = generateCombinationsArray(equation.bits);
	for (const combination of combinations) {
		const result = equation.bits.reduce((acc, bit, index) => {
			// For the first number, just return it as the initial value
			if (index === 0) return bit;
			// For subsequent numbers, apply the operator from the previous position
			return operatorsMap[combination[index - 1]](acc, bit);
		}, 0);

		if (result === equation.answer) return result;
	}
	return false;
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	const equations = data.map((line) => {
		const [_answer, _bits] = line.split(': ');
		const answer = Number(_answer);
		const bits = _bits.split(' ').map(Number);
		return { answer, bits };
	});
	let result = 0;
	equations.forEach((equation) => {
		if (getHighestAnswer(equation.bits) < equation.answer) return;
		if (getLowestAnswer(equation.bits) > equation.answer) return;
		const answer = getAnswer(equation);
		if (answer) result += answer;
	});

	console.log(puzzle, result);
};

run('sample');
// run('puzzle');
