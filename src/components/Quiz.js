import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {white} from "../utils/colors";
import {bindActionCreators} from "redux";
import {doAddQuizAction, UPDATE_QUIZ} from '../reducers/quiz.reducer';

class Quiz extends Component {

	state = {
		quiz: null,
		toggleBtn: '',
		content: '',
		counter: 0,
		length: 0,
		done: false,
		score: 0,
		originalCards: null,
		end: false,
		empty: true
	};

	static navigationOptions = ({ navigation }) => {
		const title = navigation.getParam('title', 'Quiz');
		return {
			title: title,
			headerStyle: {
				backgroundColor: 'skyblue',
			},
			headerTitleStyle: {
				flex: 1,
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				paddingBottom: 10,
				fontSize: 30,
				color: '#fff'
			},
		};
	};

	componentWillMount() {
		this.pullQuiz(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.refreshQuiz(nextProps);
	}

	correct = () => {
		let {quiz, counter} = this.state;
		quiz.questions[counter].guess = 'correct';
		if (counter + 1 >= this.state.length) {
			this.setState({
				score: this.state.score + 1
			});
			this.commit(quiz);
			return;
		}
		this.setState({
			counter: counter + 1,
			toggleBtn: 'answer',
			content: quiz.questions[counter + 1].question,
			score: this.state.score + 1
		});
	};

	incorrect = () => {
		let {quiz, counter} = this.state;
		quiz.questions[counter].guess = 'incorrect';
		if (counter + 1 >= this.state.length) {
			this.commit(quiz);
			return;
		}
		this.setState({
			counter: counter + 1,
			toggleBtn: 'answer',
			content: quiz.questions[counter + 1].question,
		});
	};

	commit(quiz) {
		// console.log('commit', quiz);
		let newQuiz = this.toMap(quiz, quiz.questions);
		this.props.doAddQuizAction(newQuiz.id, newQuiz, true);
		this.setState({
			end: true
		});
		// console.log('commit', newQuiz);
	}

	pullQuiz = (props) => {
		let quiz = props.navigation.getParam('quiz', 'no quiz');
		const decks = props.navigation.getParam('decks', 'no decks');
		if (quiz && decks) {
			const cards = decks[quiz.deckId].cards;
			let questions = quiz.questions;
			if (questions && Object.keys(questions).length !== 0) {
				questions = Object.keys(questions).map((questionId) => {
					questions[questionId].question = cards[questionId].question;
					questions[questionId].answer = cards[questionId].answer;
					return questions[questionId];
				});
				quiz.questions = questions;
				this.setState({
					quiz: quiz,
					content: questions[this.state.counter].question,
					toggleBtn: 'answer',
					length: quiz.questions.length,
					empty: false,
					end: false,
				});
			} else {
				this.setState({
					empty: true
				});
			}
		}
	};

	refreshQuiz = (props) => {
		let quiz = props.navigation.getParam('quiz', 'no quiz');
		const decks = props.navigation.getParam('decks', 'no decks');
		if (quiz && decks) {
			const cards = decks[quiz.deckId].cards;
			let questions = quiz.questions;
			if (questions && Object.keys(questions).length !== 0) {
				questions = Object.keys(questions).map((questionId) => {
					questions[questionId].question = cards[questionId].question;
					questions[questionId].answer = cards[questionId].answer;
					return questions[questionId];
				});
				quiz.questions = questions;
				this.setState({
					quiz: quiz,
					content: questions[this.state.counter].question,
					length: quiz.questions.length,
				});
			}
		}
	};

	toMap = (quiz, array) => {
		let newQuiz = {};
		Object.assign(newQuiz, quiz);
		newQuiz.questions = array.reduce((questions, q) => {
			questions[q.id] = q;
			return questions;
		}, {});
		return newQuiz;
	};

	reset() {
		// console.log(this.state, this.state.quiz.questions);
		this.setState({
			content: this.state.quiz.questions[0].question,
			toggleBtn: 'answer',
			counter: 0,
			done: false,
			score: 0,
			end: false
		});
	}

	backToDeck() {
		this.props.navigation.navigate('DeckDetail');
	}

	toggle() {
		const {quiz, counter} = this.state;
		if (this.state.toggleBtn === 'answer') {
			this.setState({
				toggleBtn: 'question',
				content: quiz.questions[counter].answer,
			});
		} else {
			this.setState({
				toggleBtn: 'answer',
				content: quiz.questions[counter].question,
			});
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.title}>
					<Text
						style={[styles.titleText]}>
						Quiz
					</Text>
				</View>
				{
					this.state.end ?
					(
						<View>
							<View style={styles.qaArea}>
								<View style={styles.qaView}>
									<Text style={styles.qaText}>Score {this.state.score}</Text>
								</View>
							</View>
							<View style={styles.buttonArea}>
								<TouchableOpacity style={styles.button} title={'Restart Quiz'}
																	onPress={() => this.reset()}>
									<Text style={[styles.buttonText]}>Restart Quiz</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonArea}>
								<TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} title={'Back to Deck'}
																	onPress={() => this.backToDeck()}>
									<Text style={[styles.buttonText]}>Back to Deck</Text>
								</TouchableOpacity>
							</View>
						</View>
					)
					:
					(
						<View>
							<View style={styles.qaArea}>
								<View style={styles.qaView}>
									<Text style={styles.qaText}>{this.state.content}</Text>
								</View>
								<TouchableOpacity  style={styles.qaBtn} title={'Answer'} onPress={() => this.toggle()}>
									<Text style={styles.qaBtnText}>{this.state.toggleBtn}</Text>
								</TouchableOpacity>
								<View style={styles.qaView}>
									<Text style={[styles.qaText, {fontSize: 20}]}>{`${this.state.counter + 1}/${this.state.length}`}</Text>
								</View>
							</View>
							<View style={styles.buttonArea}>
								<TouchableOpacity style={styles.button} title={'Correct'} onPress={() => this.correct()}>
									<Text style={[styles.buttonText]}>Correct</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonArea}>
								<TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}
																	title={'Incorrect'} onPress={() => this.incorrect()}>
									<Text style={[styles.buttonText]}>Incorrect</Text>
								</TouchableOpacity>
							</View>
						</View>
					)
				}
			</ScrollView>
		)
	}
}

function mapStateToProps(state) {
	return { deck : state.deck, quiz : state.quiz }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ doAddQuizAction }, dispatch);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white
	},
	title: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
		backgroundColor: 'powderblue',
		paddingLeft: 10
	},
	titleText: {
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 80,
		color: 'white',
		fontWeight: 'bold'
	},
	qaArea: {
		backgroundColor: 'skyblue',
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},
	qaView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	qaText: {
		fontSize: 40,
		color: 'white',
	},
	qaBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		padding: 5,
		backgroundColor: 'powderblue'
	},
	qaBtnText: {
		fontSize: 20,
		color: 'red',
	},
	buttonArea: {
		backgroundColor: 'white',
		borderColor: 'powderblue',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 30
	},
	button: {
		width: '60%',
		height: 80,
		borderColor: 'black',
		backgroundColor: 'green',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20
	},
	buttonText: {
		fontSize: 40,
		color: white
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
