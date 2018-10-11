import { AsyncStorage } from 'react-native';
import { _getDecks, _getQuizzes } from "./data";
import { setMissingDates, timeToString } from "./helper";

const DECK_STORAGE_KEY = 'mf:deck_storage_key';
const QUIZE_STORAGE_KEY = 'mf:quiz_storage_key';

export async function getDecks() {
	try{
		let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY, null);
		if (decks === null) {
			decks = _getDecks();
			await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
			return decks;
		} else {
			return JSON.parse(decks);
		}
	} catch(err){
		console.log(err);
	}
}

export async function addDeck(deck) {
	try{
		let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY, null);
		if (decks !== null) {
			decks = JSON.parse(decks);
			decks[deck.id] = deck;
			await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
			return true;
		}
		return false;
	} catch (err){
		console.log(err);
	}
}

export async function addCard(deckId, card) {
	try{
		let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY, null);
		if (decks !== null) {
			decks = JSON.parse(decks);
			const deck = decks[deckId];
			deck.cards[card.id] = card;
			decks[deck.id] = deck;
			await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
			return true;
		}
		return false;
	} catch (err){
		console.log(err);
	}
}

export async function getDeck(id) {
	try{
		let decks = await AsyncStorage.getItem(DECK_STORAGE_KEY, null);
		if (decks !== null) {
			decks = JSON.parse(decks);
			return decks[id] ;
		}
		return null;
	} catch (err){
		console.log(err);
	}
}

export async function getQuizzes() {
	try{
		let quizzes = await AsyncStorage.getItem(QUIZE_STORAGE_KEY, null);
		if (!quizzes) {
			quizzes = _getQuizzes();
			await AsyncStorage.setItem(QUIZE_STORAGE_KEY, JSON.stringify(setMissingDates(quizzes)));
			return quizzes;
		} else {
			return setMissingDates(JSON.parse(quizzes));
		}
	} catch(err){
		console.log(err);
	}
}

export async function addQuiz(quiz) {
	try{
		let quizzes = await AsyncStorage.getItem(QUIZE_STORAGE_KEY, null);
		if (quizzes !== null) {
			quizzes = JSON.parse(quizzes);
			const today = timeToString();
			quizzes[today] = quizzes[today] ? quizzes[today] : {};
			quizzes[today][quiz.id] = quiz;
			await AsyncStorage.setItem(QUIZE_STORAGE_KEY, JSON.stringify(quizzes));
			return true;
		}
		return false;
	} catch(err) {
		console.log(err);
	}
}

export async function getQuiz(id) {
	try{
		let quizzes = await AsyncStorage.getItem(QUIZE_STORAGE_KEY, null);
		if (quizzes !== null) {
			quizzes = JSON.parse(quizzes);
			const today = timeToString();
			return quizzes[today][id];
		}
		return null;
	} catch(err) {
		console.log(err);
	}
}
