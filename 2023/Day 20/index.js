import { count } from 'console';
import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';
import { EOL } from 'os';

// Setup
const target = 'sample2';
const data = getFileData(import.meta, target);
const modules = {};
let highPulseCount = 0;
let lowPulseCount = 0;

data.map((e) => {
	let [id, instructions] = e.split(' -> ');
	let type = 'unknown';
	if (id.match(/%[a-z]+/)) {
		id = id.replace('%', '');
		type = 'flip-flop';
	} else if (id.match(/&[a-z]+/)) {
		id = id.replace('&', '');
		type = 'conjunction';
	} else if (id === 'broadcaster') type = 'broadcaster';
	instructions = instructions.split(', ');
	modules[id] = { id, type, instructions, state: 'off', memory: {} };
});

// Populate conjunction memory
Object.values(modules)
	.filter((m) => m.type === 'conjunction')
	.forEach((conjunction) => {
		Object.keys(modules).forEach((id) => {
			const module = modules[id];
			if (module.instructions.includes(conjunction.id)) conjunction.memory[id] = 'low';
		});
	});

const processQueue = [];
const process = (from, to, strength) => {
	// Count pulses
	strength === 'low' ? lowPulseCount++ : highPulseCount++;
	// Process module
	const module = modules[to];
	if (!module) return;
	switch (module.type) {
		case 'flip-flop':
			if (strength === 'low') {
				strength = module.state === 'off' ? 'high' : 'low';
				module.state = module.state === 'off' ? 'on' : 'off';
			} else return;
			break;
		case 'conjunction':
			if (module.memory[from]) module.memory[from] = modules[from].state;
			const active = Object.values(module.memory).every((v) => v === 'on');
			if (active) strength = 'low';
			break;
		case 'broadcaster':
			break;
		default:
			break;
	}
	// Send pulse to next module
	module.instructions.forEach((nextModule) => {
		// console.log(id, strength, '->', nextModule);
		processQueue.push({
			from: module.id,
			to: nextModule,
			strength,
		});
	});
};

// ===========================================================
// PART 1
// ===========================================================
for (let i = 0; i < 1000; i++) {
	console.log('==============================');
	console.log('Button press', i + 1);
	console.log('==============================');
	process('', 'broadcaster', 'low');
	while (processQueue.length) {
		const { from, to, strength } = processQueue.shift();
		console.log(from, strength, '->', to);
		process(from, to, strength);
	}
}
console.log('lowPulseCount', lowPulseCount, 'highPulseCount', highPulseCount);
let answer1 = lowPulseCount * highPulseCount;
console.log(answer1);

// ===========================================================
// PART 2
// ===========================================================
