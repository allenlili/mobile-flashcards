import { combineReducers } from 'redux';
import deck from './reducers/deck.reducer';
import quiz from './reducers/quiz.reducer';

const reducers = combineReducers({
	deck,
	quiz,
});

export default reducers;
