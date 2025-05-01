export class Doubler {
	#getNumber;
	#double = $derived(this.#getNumber() * 2);
	constructor(getNumber: () => number) {
		this.#getNumber = getNumber;
	}
	get value() {
		return this.#double;
	}
}
