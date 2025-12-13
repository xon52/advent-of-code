import { getFileData } from '../../helpers/index.js';

const run = (puzzle) => {
  const startTime = performance.now();

  const data = getFileData(import.meta, puzzle);
  const result = 0;

  const endTime = performance.now();
  const elapsedTime = (endTime - startTime).toFixed(3);

  console.log(puzzle, result, `(${elapsedTime}ms)`);
};

run('sample');
run('puzzle');
