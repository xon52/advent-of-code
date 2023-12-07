import { getFileData } from '../../helpers/index.js';

const run = (target) => {
	const data = getFileData(import.meta, target);

	const getHand = (str) => str.split(' ')[0];
	const getHandPoints = (str) => str.split(' ')[1];

	const cardRanks = { A: 14, K: 13, Q: 12, J: 11, T: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2 };

	const getSetScore = (str) => {
		const arr = str.split('');
		const cardSet = [...new Set(arr)];
		if (cardSet.length === 5) return 0; // High card
		if (cardSet.length === 4) return 1; // One pair
		if (cardSet.length === 1) return 6; // Five of a kind
		if (cardSet.length === 3) {
			for (let i = 0; i < 3; i++) {
				if (arr.filter((a) => a === cardSet[i]).length === 3) return 3; // Three of a kind
			}
			return 2; // Two pair
		}
		if (cardSet.length === 2) {
			for (let i = 0; i < 3; i++) {
				if (arr.filter((a) => a === cardSet[i]).length === 4) return 5; // Four of a kind
			}
			return 4; // 3 Full house
		}
		throw new Error(`Invalid card length: ${cardSet.length}`);
	};

	// Order hands
	const cardsRanked = data.sort((a, b) => {
		if (a === b) return 0;
		const aSetScore = getSetScore(getHand(a));
		const bSetScore = getSetScore(getHand(b));
		// console.log(getHand(a), aSetScore);
		if (aSetScore > bSetScore) return 1;
		if (bSetScore > aSetScore) return -1;
		for (let i = 0; i < 5; i++) {
			if (a[i] === b[i]) continue;
			else return cardRanks[a[i]] - cardRanks[b[i]];
		}
	});

	// Result
  // for (let i=0;i<1000;i+=100) {
	// console.log(cardsRanked.map((e) => [e, getSetScore(getHand(e))]).slice(i,i+100));
  // }
	const result = cardsRanked.map((e, i) => +getHandPoints(e) * (i + 1)).reduce((p, c) => p + c, 0);
  console.log(result)
};

// run('sample');
run('puzzle')
