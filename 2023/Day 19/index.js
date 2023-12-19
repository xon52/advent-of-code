import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';
import { EOL } from 'os';

// Setup
const target = 'puzzle';
const workflows = {};
const parts = [];
let [_workflows, _parts] = getFileData(import.meta, target, true).split(`${EOL}${EOL}`);
_workflows.split(EOL).forEach((e) => {
	let [name, rules] = e.replace('}', '').split('{');
	rules = rules.split(',').map((e) => {
		if (e.match(/^[a-zA-Z]+$/)) return { workflow: e };
		let op = undefined;
		if (e.includes('<')) op = '<';
		else if (e.includes('>')) op = '>';
		let [test, workflow] = e.split(':');
		let [category, value] = test.split(op);
		return { category, value, op, workflow };
	});
	workflows[name] = rules;
});
_parts.split(EOL).map((e) => {
	const x = {};
	e.replaceAll(/[{}]/g, '')
		.split(',')
		.forEach((e) => {
			let [category, value] = e.split('=');
			x[category] = parseInt(value);
		});
	parts.push(x);
});
const rejected = [];
const accepted = [];
const startingWorkflow = 'in';

const runWorkflow = (rules, part) => {
	// console.log('running workflow', rules, 'on part', part);
	for (let r = 0; r < rules.length; r++) {
		const rule = rules[r];
		let pass = false;
		// console.log('rule', rule);
		if (rule.op === undefined) pass = true;
		else if (rule.op === '<' && part[rule.category] < rule.value) pass = true;
		else if (rule.op === '>' && part[rule.category] > rule.value) pass = true;
		// else throw new Error('Invalid op', rule.op);
		if (pass) {
			// console.log('pass', rule);
			if (rule.workflow === 'A') return accepted.push(part);
			if (rule.workflow === 'R') return rejected.push(part);
			return runWorkflow(workflows[rule.workflow], part);
		}
	}
};

// ===========================================================
// PART 1
// ===========================================================
for (let p = 0; p < parts.length; p++) {
	const part = parts[p];
	runWorkflow(workflows[startingWorkflow], part);
}
let answer1 = accepted.reduce((p, c) => p + c.x + c.m + c.a + c.s, 0);
console.log(answer1);

// ===========================================================
// PART 2
// ===========================================================
