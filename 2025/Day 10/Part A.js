import { getFileData } from '../../helpers/index.js';

const parseLine = (line) => {
	const diagramMatch = line.match(/\[([.#]+)\]/);
	const diagram = diagramMatch[1];
	const target = diagram.split('').map(c => c === '#');
	const buttonMatches = line.matchAll(/\(([0-9,]+)\)/g);
	const buttons = [];
	for (const match of buttonMatches) {
		const indices = match[1].split(',').map(Number);
		buttons.push(indices);
	}
	return { target, buttons };
};

const pressButton = (currentState, buttonIndices) => {
	const newState = [...currentState];
	for (const idx of buttonIndices) {
		if (idx < newState.length) {
			newState[idx] = !newState[idx];
		}
	}
	return newState;
};

const stateToString = (state) => {
	return state.join(',');
};

const solve = (target, buttons) => {
	const numLights = target.length;
	const initialState = new Array(numLights).fill(false);
	const targetString = stateToString(target);
	const queue = [[initialState, 0]];
	const visited = new Set();
	visited.add(stateToString(initialState));

	while (queue.length > 0) {
		const [currentState, numPresses] = queue.shift();
		for (const button of buttons) {
			const newState = pressButton(currentState, button);
			const newStateString = stateToString(newState);

			if (newStateString === targetString) {
				return numPresses + 1;
			}

			if (!visited.has(newStateString)) {
				visited.add(newStateString);
				queue.push([newState, numPresses + 1]);
			}
		}
	}
	throw new Error('No solution found');
};

const run = (puzzle) => {
	const startTime = performance.now();

	const data = getFileData(import.meta, puzzle);

	let totalPresses = 0;

	for (const line of data) {
		const { target, buttons } = parseLine(line);
		const presses = solve(target, buttons);
		totalPresses += presses;
	}

	const endTime = performance.now();
	const elapsedTime = (endTime - startTime).toFixed(3);

	console.log(puzzle, totalPresses, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
