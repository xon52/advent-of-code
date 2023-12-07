import { getFileData } from '../../helpers/index.js';

const data = getFileData(import.meta, 'puzzle');

// Get times and distances
const [times, distances] = data.map((e) =>
	e
		.split(/ +/g)
		.map((f) => +f)
		.slice(1)
);

const getDistance = (holdDown, totalTime) => {
	let accelerationTime = totalTime - holdDown;
	if (accelerationTime < 0) throw new Error(`Acceleration time can't be < 0.`);
	return holdDown * accelerationTime;
};

const waysToWin = {};

for (let i = 0; i < times.length; i++) {
	const time = times[i];
	const record = distances[i];
	waysToWin[time] = [];
	for (let hold = 1; hold < time - 1; hold++) {
		const dist = getDistance(hold, time);
		if (dist > record) waysToWin[time].push([hold, dist]);
	}
}

// console.log(waysToWin);

const result = Object.values(waysToWin).reduce((p, c) => c.length * p, 1);

console.log(result);
