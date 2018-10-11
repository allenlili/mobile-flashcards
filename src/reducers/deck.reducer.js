import {getDecks, addDeck, addCard} from "../utils/api";
import {formatDeck, formatCard} from "../utils/helper";

export const GET_DECKS = 'get_decks';
export const ADD_DECK = 'add_deck';
export const ADD_CARD = 'add_card';

function getDecksAction(data){
	return {
		type: GET_DECKS,
		payload: data
	}
}

function addDeckAction(data) {
	return {
		type: ADD_DECK,
		payload: data
	}
}

function addCardAction(data) {
	return {
		type: ADD_CARD,
		payload: data
	}
}

export function doGetDecksAction() {
	return async dispatch => {
		try {
			const decks = await getDecks();
			dispatch(getDecksAction(decks));
		} catch (err) {
			console.log(err);
		}
	}
}

export function doAddDeckAction(deckTitle) {
	return async dispatch => {
		try {
			const decks = await getDecks();
			if (!decks[deckTitle.toLowerCase()]) {
				const deck = formatDeck(deckTitle);
				const rt = await addDeck(deck);
				const decks = await getDecks();
				if (rt) {
					dispatch(addDeckAction({code: 'success', decks: decks, deck: deck}));
				} else {
					dispatch(addDeckAction({code: 'fail'}));
				}
			} else {
				dispatch(addDeckAction({code: 'fail'}));
			}
		} catch (err) {
			console.log(err);
		}
	}
}

export function doAddCardAction(deckId, card) {
	return async dispatch => {
		try {
			const decks = await getDecks();
			if (decks) {
				const deck = decks[deckId];
				if (deck) {
					const rt = await addCard(deckId, formatCard(card));
					const decks = await getDecks();
					if (rt) {
						dispatch(addCardAction({code: 'success', decks: decks, deckId: deckId}));
					} else {
						dispatch(addCardAction({code: 'fail'}));
					}
				} else {
					dispatch(addCardAction({code: 'fail'}));
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
}

const init = {
	decks: null,
	code: null,
	deckId: null
};
export default function deck(state = init, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_DECKS:
			return {...state, decks: payload};
		case ADD_DECK:
			return {...state, code: payload.code, decks: payload.decks, deckId: payload.deck.id };
		case ADD_CARD:
			return {...state, code: payload.code, decks: payload.decks, deckId: payload.deckId };
		default:
			return state;
	}
}
