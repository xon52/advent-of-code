import fs from 'fs';
import path from 'path';
import { URL } from 'url';

export const getFileData = (importMeta, filename, raw = false) => {
	const __dirname = new URL('.', importMeta.url).pathname;
	const dir = decodeURI(__dirname.slice(1));

	const text = fs.readFileSync(path.join(dir, `${filename}.txt`), 'utf8');
	const rows = raw ? text : text.split(`\r\n`);
	return rows;
};
