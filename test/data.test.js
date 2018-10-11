import { _getDecks, _getQuizzes } from "../src/utils/data";

test('get decks', () => {
	console.log(_getDecks());
});

test('get quizzes', () => {
	console.log(JSON.stringify(_getQuizzes()));
});