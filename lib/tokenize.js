const splitAt = require('split-at');
const symbols = require('./symbols');
const modifiers = require('./modifiers');

const symbolsByLength = [...symbols, ...modifiers];

symbolsByLength.sort(({xSampa: a}, {xSampa: b}) => b.length - a.length);

class Tokenizer {
	constructor(string) {
		this.string = string;
		this.tokens = [];
	}

	tokenize() {
		while (this.string && this.string.length > 0) {
			const [token, string] = this.nextToken();
			this.tokens.push(token);
			this.string = string;
		}
		return this.tokens;
	}

	nextToken() {
		const knownValuePair = symbolsByLength.find(({xSampa: s}) => {
			return this.string.startsWith(s);
		});
		const knownValue = knownValuePair && knownValuePair.xSampa;
		const splitLength = knownValue ? knownValue.length - 1 : 0;
		const [token, rest] = splitAt(this.string, splitLength);
		return [token, rest || ''];
	}
}

function tokenize(string) {
	return (new Tokenizer(string)).tokenize();
}

module.exports = tokenize;
