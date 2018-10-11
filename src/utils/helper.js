import uuidv4 from 'uuid/v4';
import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'mobile-flashcards:notifications';


export function setMissingDates (quizzes) {
	const timestamp = Date.now();
	for (let i = -183; i <= 0; i++) {
		const time = timestamp + i * 24 * 60 * 60 * 1000;
		const strTime = timeToString(time);

		if (typeof quizzes[strTime] === 'undefined') {
			quizzes[strTime] = null;
		}
	}
	return quizzes;
}

export function timeToString (time = Date.now()) {
	const date = new Date(time);
	const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	return todayUTC.toISOString().split('T')[0];
}

export function timeToTimeString (time = Date.now()) {
	const date = new Date(time);
	return date.toLocaleTimeString();
}

export function getDailyReminder() {
	return {
		today: "🖖 Don't forget to take a quiz today!"
	}
}

export function generateUUID() {
	return uuidv4().slice(0, 8);
}

export function formatDeck(title) {
	return {
			id: title.toLowerCase(),
			title: title,
			createdTime: Date.now(),
			cards: {}
		}
}

export function formatCard({question, answer}) {
	const id = generateUUID();
	return { id, question, answer }
}

export function formatQuiz(uuid, { id, cards }) {
	const questions = Object.keys(cards)
		.map(key => ({ id: key, guess: null }))
		.reduce((obj, item) => {
			obj[item.id] = item;
			return obj;
		}, {});
	return {
		id: uuid,
		deckId: id,
		questions: questions,
		score: 0,
		createdTime: Date.now(),
		completed: false
	}
}

export function clearLocationNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
		.then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
	return {
		title: 'Do your quiz!',
		body: "🖖 don't forget to complete a quiz today!",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
					.then(({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync();

							let tomorrow = new Date();
							tomorrow.setDate(tomorrow.getDate() + 1);
							tomorrow.setHours(20);
							tomorrow.setMinutes(0);
							Notifications.cancelAllScheduledNotificationsAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							);
							AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
						}
					})
			}
		})
}
