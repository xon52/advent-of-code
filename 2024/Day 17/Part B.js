import { getFileData } from '../../helpers/index.js';

/*
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0

Combo operands 0 through 3 represent literal values 0 through 3.
Combo operand 4 represents the value of register A.
Combo operand 5 represents the value of register B.
Combo operand 6 represents the value of register C.
Combo operand 7 is reserved and will not appear in valid programs.

The adv instruction (opcode 0) performs division. The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand. (So, an operand of 2 would divide A by 4 (2^2); an operand of 5 would divide A by 2^B.) The result of the division operation is truncated to an integer and then written to the A register.
The bxl instruction (opcode 1) calculates the bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
The bst instruction (opcode 2) calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
The jnz instruction (opcode 3) does nothing if the A register is 0. However, if the A register is not zero, it jumps by setting the instruction pointer to the value of its literal operand; if this instruction jumps, the instruction pointer is not increased by 2 after this instruction.
The bxc instruction (opcode 4) calculates the bitwise XOR of register B and register C, then stores the result in register B. (For legacy reasons, this instruction reads an operand but ignores it.)
The out instruction (opcode 5) calculates the value of its combo operand modulo 8, then outputs that value. (If a program outputs multiple values, they are separated by commas.)
The bdv instruction (opcode 6) works exactly like the adv instruction except that the result is stored in the B register. (The numerator is still read from the A register.)
The cdv instruction (opcode 7) works exactly like the adv instruction except that the result is stored in the C register. (The numerator is still read from the A register.)

Here are some examples of instruction operation:
If register C contains 9, the program 2,6 would set register B to 1.
If register A contains 10, the program 5,0,5,1,5,4 would output 0,1,2.
If register A contains 2024, the program 0,1,5,4,3,0 would output 4,2,5,6,7,7,7,7,3,1,0 and leave 0 in register A.
If register B contains 29, the program 1,7 would set register B to 26.
If register B contains 2024 and register C contains 43690, the program 4,0 would set register B to 44354.
*/

const getComboOperandValue = (comboOperand, registerA, registerB, registerC) => {
	if (comboOperand >= 0 && comboOperand <= 3) {
		return comboOperand;
	} else if (comboOperand === 4) {
		return registerA;
	} else if (comboOperand === 5) {
		return registerB;
	} else if (comboOperand === 6) {
		return registerC;
	} else if (comboOperand === 7) {
		throw new Error('Invalid combo operand');
	}
};

const process = (pointer, instructions, registerA, registerB, registerC, output) => {
	const opcode = +instructions[pointer];
	const comboOperand = +instructions[pointer + 1];
	let nextPointer = pointer + 2;
	console.log(opcode, comboOperand, nextPointer);
	if (opcode === 0) {
		registerA = Math.floor(registerA / 2 ** getComboOperandValue(comboOperand, registerA, registerB, registerC));
		console.log('registerA', registerA);
	} else if (opcode === 1) {
		registerB = registerB ^ comboOperand;
		console.log('registerB', registerB);
	} else if (opcode === 2) {
		registerB = getComboOperandValue(comboOperand, registerA, registerB, registerC) % 8;
		console.log('registerB', registerB);
	} else if (opcode === 3 && registerA !== 0) {
		nextPointer = comboOperand;
	} else if (opcode === 4) {
		registerB = registerB ^ registerC;
		console.log('registerB', registerB);
	} else if (opcode === 5) {
		output.push(getComboOperandValue(comboOperand, registerA, registerB, registerC) % 8);
		console.log('output', output);
	} else if (opcode === 6) {
		registerB = Math.floor(registerA / 2 ** getComboOperandValue(comboOperand, registerA, registerB, registerC));
		console.log('registerB', registerB);
	} else if (opcode === 7) {
		registerC = Math.floor(registerA / 2 ** getComboOperandValue(comboOperand, registerA, registerB, registerC));
		console.log('registerC', registerC);
	}
	if (nextPointer > instructions.length - 1) {
		return output;
	}
	return process(nextPointer, instructions, registerA, registerB, registerC, output);
};

const run = (puzzle) => {
	const data = getFileData(import.meta, puzzle);
	let registerA = BigInt(data[0].split(': ')[1]);
	let registerB = BigInt(data[1].split(': ')[1]);
	let registerC = BigInt(data[2].split(': ')[1]);
	const instructions = data[4].split(': ')[1].split(',');
	let output = [];

	const result = process(0, instructions, registerA, registerB, registerC, output).join(',');
};

run('sample2');
// run('puzzle');
