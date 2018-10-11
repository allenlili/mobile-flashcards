import { addQuiz, getQuizzes } from "../utils/api";
import {formatQuiz, timeToString} from "../utils/helper";

export const GET_QUIZZES = 'get_quizzes';
export const ADD_QUIZ = 'add_quiz';
export const UPDATE_QUIZ = 'update_quiz';

function getQuizzesAction(data){
	return {
		type: GET_QUIZZES,
		payload: data
	}
}

function addQuizAction(data) {
	return {
		type: ADD_QUIZ,
		payload: data
	}
}

export function doGetQuizzesAction() {
	// return dispatch => {
	// 	getDecks()
	// 		.then(resp => {
	// 			console.log(resp);
	// 			dispatch(getDeckAction(resp));
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };
	return async dispatch => {
		try {
			const quizzes = await getQuizzes();
			dispatch(getQuizzesAction(quizzes));
		} catch (err) {
			console.log(err);
		}
	}
}

export function doAddQuizAction(uuid, quiz, update = false) {
	return async dispatch => {
		try {
			let quizzes = await getQuizzes();
			const quizObj = update ? quiz : formatQuiz(uuid, quiz);
			// console.log(quizObj);
			const rt = await addQuiz(quizObj);
			if (rt) {
				quizzes = await getQuizzes();
				dispatch(addQuizAction({code: 'success', quizzes: quizzes, quiz: quizObj}));
			} else {
				dispatch(addQuizAction({code: 'fail'}));
			}
		} catch (err) {
			console.log(err);
		}
	}
}

const init = {
	code: null,
	quizzes: null,
	quiz: null,
};
export default function quiz(state = init, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_QUIZZES:
			return {...state, quizzes: payload};
		case ADD_QUIZ:
			return {...state, code: payload.code, quizzes: payload.quizzes, quiz: payload.quiz };
		default:
			return state;
	}
}
