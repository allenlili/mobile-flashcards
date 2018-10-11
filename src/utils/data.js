// the initial data

// mock decks
// unique key: id(from lowercase title)
const decks = {
	react: {
		id: 'react',
		title: 'React',
		createdTime: 1533819023594,
		cards: {
			'cd4fe256': {
				id: 'cd4fe256',
				question: 'What is React?',
				answer: 'A library for managing user interfaces.'
			},
			'd0497fc4': {
				id: 'd0497fc4',
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event.'
			}
		}
	},
	javascript: {
		id: 'javascript',
		title: 'Javascript',
		createdTime: 1533819027134,
		cards: {
			'428e81a0': {
				id: '428e81a0',
				question: 'Is it js same as java?',
				answer: 'No.'
			},
			'7205234a': {
				id: '7205234a',
				question: 'It is a dynamic language?',
				answer: 'Yes.'
			},
		}
	},
	java: {
		id: 'java',
		title: 'Java',
		createdTime: 1533819070078,
		cards: {
			'f2a3dde6': {
				id: 'f2a3dde6',
				question: 'Can we use Java in big data?',
				answer: 'Yes.'
			},
			'4c5602c9': {
				id: '4c5602c9',
				question: 'Is Java one of the most popular languages?',
				answer: 'Yes.'
			}
		}
	},
	python: {
		id: 'python',
		title: 'Python',
		createdTime: 1533819023594,
		cards: {
			'988a67ca': {
				id: '988a67ca',
				question: 'Can you name some python web framework?',
				answer: 'Flask and Django.'
			},
			'bf90d47d': {
				id: 'bf90d47d',
				question: 'Which fields are best for python?',
				answer: 'AI, Data Science and Web.'
			}
		}
	},
	go: {
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
	}
};

// mock quizzes by date
// unique key: date
const quizzes = {
	"2018-08-06": null,
	"2018-08-07": {
		'9c277d29': {
			id: '9c277d29',
			deckId: 'go',
			questions: {
				'511145c9': {
					id: '511145c9',
					guess: 'incorrect'
				},
				'c89a8d76': {
					id: 'c89a8d76',
					guess: 'correct'
				}
			},
			score: 1,
			createdTime: 1533616422,
			completed: true
		},
		'4427b21c': {
			id: '4427b21c',
			deckId: 'go',
			questions: {
				'511145c9': {
					id: '511145c9',
					guess: 'incorrect'
				},
				'c89a8d76': {
					id: 'c89a8d76',
					guess: null
				}
			},
			score: null,
			createdTime: 1533620022,
			completed: false
		}
	},
	"2018-08-08": null
};

export function _getDecks() {
	return decks;
}

export function _getQuizzes() {
	return quizzes;
}
