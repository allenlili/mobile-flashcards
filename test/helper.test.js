import {
	setMissingDates,
	getDailyReminder,
	generateUUID,
	timeToString,
	formatDeck,
	formatCard, formatQuiz, timeToTimeString,
} from "../src/utils/helper";
import {_getDecks, _getQuizzes} from "../src/utils/data";

test('set missing dates to quizzes', () => {
	let quizzes = getQuizzes();
	const oldLen = Object.keys(quizzes).length;
	quizzes = setMissingDates(quizzes);
	const newLen = Object.keys(quizzes).length;
	expect(newLen).toEqual(184);
});

test('timeToString', () => {
	console.log(timeToString());
});

test('timeToTimeString', () => {
	console.log(timeToTimeString());
});

test('set get daily reminder', () => {
	console.log(getDailyReminder());
});

test('uuid generate', () => {
	const uuid = generateUUID();
	console.info(uuid);
	expect(uuid).toBeTruthy();
});

test('test format deck', () => {
	// {
	// 	id: 'java',
	// 	title: 'Java',
	// 	createdTime: 1533819070078,
	// 	cards: {}
	// }
	console.log(formatDeck('Java'));
});

test('test format card', () => {
	// {
	// 	id: '4c5602c9',
	// 	question: 'Is Java one of the most popular languages?',
	// 	answer: 'Yes.'
	// }
	const card = {question: 'Is Java one of the most popular languages?', answer: 'Yes.'};
	console.log(formatCard(card));
});

test('test format quiz', () => {
	// {
	// 	  id: '9c277d29',
	// 		deckId: 'go',
	// 		questions: {
	// 		'511145c9': {
	// 			id: '511145c9',
	// 				guess: 'incorrect'
	// 		},
	// 		'c89a8d76': {
	// 			id: 'c89a8d76',
	// 				guess: 'correct'
	// 		}
	// 	 },
	// 	 score: 1
	// }
	const deck = {
		id: 'go',
		title: 'Go',
		createdTime: 1533819071173,
		cards: {
			'511145c9' : {
				id: '511145c9',
				question: 'What is Go?',
				answer: 'Go is an open source programming language that makes it easy to build simple, reliable, and efficient software. '
			},
			'c89a8d76' : {
				id: 'c89a8d76',
				question: 'Why should you learn Go?',
				answer: 'Go has goroutines !!!'
			}
		}
	};
	console.log(JSON.stringify(formatQuiz(deck)));
});
