export class Game {
	index: number;
	guesses: string[];
	answers: string[];
	answer: string;

	private allowed: Set<string>;

	/**
	 * Serialize game state so it can be set as a cookie
	 */
	static serialize(game: Pick<Game, 'index' | 'guesses' | 'answers'>) {
		return `${game.index}-${game.guesses.join(' ')}-${game.answers.join(' ')}`;
	}

	/**
	 * Create a game object from the player's cookie, or initialise a new game
	 */
	constructor({
		serialized,
		words,
		allowed
	}: {
		serialized?: string | undefined;
		words: string[];
		allowed: Set<string>;
	}) {
		this.allowed = allowed;

		if (serialized) {
			const [index, guesses, answers] = serialized.split('-');

			this.index = +index;
			this.guesses = guesses ? guesses.split(' ') : [];
			this.answers = answers ? answers.split(' ') : [];
		} else {
			this.index = Math.floor(Math.random() * words.length);
			this.guesses = ['', '', '', '', '', ''];
			this.answers = [];
		}

		this.answer = words[this.index];
	}

	/**
	 * Update game state based on a guess of a five-letter word. Returns
	 * true if the guess was valid, false otherwise
	 */
	enter(letters: string[]) {
		const word = letters.join('');
		const valid = this.allowed.has(word);

		if (!valid) return false;

		this.guesses[this.answers.length] = word;

		const available = Array.from(this.answer);
		const answer = Array(5).fill('_');

		// first, find exact matches
		for (let i = 0; i < 5; i += 1) {
			if (letters[i] === available[i]) {
				answer[i] = 'x';
				available[i] = ' ';
			}
		}

		// then find close matches (this has to happen
		// in a second step, otherwise an early close
		// match can prevent a later exact match)
		for (let i = 0; i < 5; i += 1) {
			if (answer[i] === '_') {
				const index = available.indexOf(letters[i]);
				if (index !== -1) {
					answer[i] = 'c';
					available[index] = ' ';
				}
			}
		}

		this.answers.push(answer.join(''));

		return true;
	}

	toString() {
		return Game.serialize(this);
	}
}
