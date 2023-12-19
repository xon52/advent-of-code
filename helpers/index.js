import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { EOL } from "os";

export const getFilePath = (importMeta, filename) => {
	const __filename = filename || path.basename(importMeta.url);
	const __dirname = new URL('.', importMeta.url).pathname;
	const __fullpath = decodeURI(path.join(__dirname, __filename)).slice(1);
	return __fullpath;
};

export const getFileData = (importMeta, filename, raw = false) => {
	const __dirname = new URL('.', importMeta.url).pathname;
	const dir = decodeURI(__dirname.slice(1));
	const text = fs.readFileSync(path.join(dir, `${filename}.txt`), 'utf8');
	const rows = raw ? text : text.split(EOL);
	return rows;
};
