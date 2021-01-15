import fs from "fs";
import path from "path";

interface CID {
	code: string;
	name: string;
}

const FILE = path.join(__dirname, "CID10.json");

export const queryCIDByCode = (code: string): CID | null => {
	const parsedFile = JSON.parse(fs.readFileSync(FILE).toString());
	let data: CID[] = parsedFile.filter((el: CID) => el.code === code);

	if (data.length === 1) {
		return data[0];
	}

	return null;
};

export const queryCIDByName = (name: string): CID | null => {
	const parsedFile = JSON.parse(fs.readFileSync(FILE).toString());
	let data: CID[] = parsedFile.filter((el: CID) => el.name === name);

	if (data.length === 1) {
		return data[0];
	}

	return null;
};
