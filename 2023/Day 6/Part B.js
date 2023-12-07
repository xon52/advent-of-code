import { getFileData } from '../../helpers/index.js';

const data = getFileData(import.meta, 'puzzle');

// Get times and distances
const [time, distance] = data.map((e) => e.split(/ +/g).slice(1).join(''));

const getDistance = (holdDown, totalTime) => {
	let accelerationTime = totalTime - holdDown;
	if (accelerationTime < 0) throw new Error(`Acceleration time can't be < 0.`);
	return holdDown * accelerationTime;
};

let waysToWin = 0;

for (let hold = 1; hold < time - 1; hold++) {
	if (getDistance(hold, time) > distance) waysToWin++;
}

console.log(waysToWin);
