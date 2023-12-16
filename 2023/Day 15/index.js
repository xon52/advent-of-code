import { getFileData, getFilePath } from '../../helpers/index.js';
import { rotate2DArrayClockwise, rotate2DArrayCounterClockwise } from '../../helpers/utils.js';

// Setup
const target = 'puzzle';
const data = getFileData(import.meta, target, true).split(',');
const data2 = data.map((e) => {
	let operator = e.includes('=') ? '=' : '-';
	let [code, focus] = e.split(operator);
	return { code, operator, focus };
});

// Get hash
const hash = (str) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash += str.charCodeAt(i);
		hash *= 17;
		hash %= 256;
	}
	return hash;
};

// Get focusing power
const getFocusingPower = (boxNumber, slotNumber, focus) => (boxNumber + 1) * (slotNumber + 1) * focus;

// ===========================================================
// PART 1
// ===========================================================
const answer1 = data.reduce((p, c) => p + hash(c), 0);
console.log('Part 1:', answer1);

// ===========================================================
// PART 2
// ===========================================================
let focusingPower = 0;
const boxes = new Array(256);
for (let i = 0; i < boxes.length; i++) boxes[i] = [];

// Store in boxes
data2.forEach(({ code, operator, focus }, dataIndex) => {
	const currBox = hash(code);
	const codeIndex = boxes[currBox].findIndex((e) => e.code === code);
	if (operator === '=') {
		if (codeIndex < 0) boxes[currBox].push({ code, focus });
		else boxes[currBox].splice(codeIndex, 1, { code, focus });
	} else {
		if (codeIndex > -1) boxes[currBox].splice(codeIndex, 1);
	}
});

// Get focusing power
boxes.forEach((box, boxNumber) => {
	box.forEach(({ code, focus }, slotNumber) => (focusingPower += getFocusingPower(boxNumber, slotNumber, focus)));
});

console.log('Part 2:', focusingPower);
