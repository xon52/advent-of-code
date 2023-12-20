import { getFileData } from '../../helpers/index.js';
import { create2DArray } from '../../helpers/utils.js';
import { EOL } from 'os';

// Setup
const target = 'sample';
const data = getFileData(import.meta, target);
const modules = {};

data.map(e=>{
  const [_id, _instructions] = e.split(' -> ');
  let type = 'unknown'
  if(id.match(/%[a-z]+/)) type = 'flip-flop'
  else if(id.match(/&[a-z]+/)) type = 'converter'
  else if (id==='broadcast') type = 'broadcast'
  const instructions = _instructions.split(', ');
  modules[id] = { type, instructions };
})

const process = (id, strength) => {
  const module = modules[id];
  }
}

const broadcast = (strength) => {
  modules['broadcast'].instructions.forEach()
}


// ===========================================================
// PART 1
// ===========================================================
// for (let p = 0; p < parts.length; p++) {
// 	const part = parts[p];
// 	runWorkflow(workflows[startingWorkflow], part);
// }
// let answer1 = accepted.reduce((p, c) => p + c.x + c.m + c.a + c.s, 0);
// console.log(answer1);

// ===========================================================
// PART 2
// ===========================================================
