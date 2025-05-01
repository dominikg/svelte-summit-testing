import {describe,expect,it} from 'vitest';
import { words, allowed } from './words.server.ts';

describe('words',()=>{
	it('should contain at least 2000 entries',()=>{
		expect(words.length).toBeGreaterThan(2000);
	})
})

describe('allowed',()=>{
	it('should contain at least 12000 entries',()=>{
		expect(allowed.size).toBeGreaterThan(12000);
	})
	it('should contain all words',()=>{
		const missingWords = words.filter(w => !allowed.has(w));
		expect(missingWords.length,`allowed does not contain the following words: ${missingWords.join(',')}`).toBe(0)
	})
})
