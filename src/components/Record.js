import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {white} from "../utils/colors";
import { AppLoading } from 'expo';
import {Agenda} from 'react-native-calendars';
import UdaciFitnessCalendar from 'udacifitness-calendar';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { doGetQuizzesAction } from "../reducers/quiz.reducer";
import { getDailyReminder, timeToString, timeToTimeString } from '../utils/helper';
import { doGetDecksAction } from "../reducers/deck.reducer";

class Record extends Component {
	componentDidMount() {
		this.props.doGetQuizzesAction();
		this.props.doGetDecksAction();
	}

	render() {
		const quizzes = this.loadItems();
		return (
			<Agenda
				items={quizzes}
				renderItem={this.renderItem}
				renderEmptyDate={this.renderEmptyDate}
				rowHasChanged={this.rowHasChanged}
				futureScrollRange={0}
				maxDate={timeToString()}
			/>
		);
	}

	loadItems = () => {
		let { quizzes } = this.props.quiz;
		let { decks } = this.props.deck;
		if (!quizzes || !decks) {
			return (<AppLoading/>);
		}
		Object.keys(quizzes).map((date) => {
			let dateMapQuizArray = [];
			if(quizzes[date]) {
				let quizzesForDate = quizzes[date];
				dateMapQuizArray = Object.keys(quizzesForDate).map((key) => {
					return {
						key,
						deckId: quizzesForDate[key].deckId,
						title: decks[quizzesForDate[key].deckId].title,
						score: quizzesForDate[key].score,
						createdTime: quizzesForDate[key].createdTime,
						completed: quizzesForDate[key].completed
					};
				});
			}
			quizzes[date] = dateMapQuizArray;
		});
		return quizzes;
	};

	renderItem = (item) => {
		const { title, createdTime, score, completed } = item;
		const time = timeToTimeString(createdTime);
		return (
			<View style={styles.item}>
				<Text numberOfLines={5} style={{fontSize: 20}}>
					👏 I started a quiz from {title} at {time}.
					{/*{ completed === true ? '. ' : ", but it is not completed yet. " }*/}
					{/*{ score === null ? 'So no result.' : `I got ${score} score.`}*/}
				</Text>
			</View>
		);
	};

	renderEmptyDate = (date) => {
		const todayStr = timeToString();
		const dateStr = timeToString(date.toString());
		return (
			<View style={styles.item}>
				{
					todayStr === dateStr ?
						(<Text numberOfLines={5} style={{fontSize: 20}}>{getDailyReminder()['today']}</Text>)
						:
						(<Text numberOfLines={5} style={{fontSize: 20}}>🤪 You didn't complete a quiz!</Text>)
				}
			</View>
		);
	};

	rowHasChanged = (r1, r2) => {
		return r1.name !== r2.name;
	};
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 17,
		justifyContent: 'center',
	}
});

function mapStateToProps(state) {
	return {
		deck: state.deck,
		quiz: state.quiz
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ doGetQuizzesAction, doGetDecksAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Record);
