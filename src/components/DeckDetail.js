import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { white } from "../utils/colors";
import { bindActionCreators } from "redux";
import {ADD_CARD, doGetDecksAction} from "../reducers/deck.reducer";
import {ADD_QUIZ, doAddQuizAction} from "../reducers/quiz.reducer";
import {generateUUID} from "../utils/helper";

class DeckDetail extends Component {
	state = {
		action: ''
	};

	static navigationOptions = ({ navigation }) => {
		const title = navigation.getParam('title');
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

	componentWillReceiveProps(nextProps) {
		const { code, quiz } = nextProps.quiz;
		// console.log(quiz);
		if (code === 'success' && this.state.action === ADD_QUIZ) {
			const { decks } = nextProps.deck;
			// console.log(decks);
			nextProps.navigation.navigate('Quiz', {quiz: quiz, decks: decks});
		}
	}

	addCard = ({ id }) => {
		this.setState({
			action: ADD_CARD
		});
		this.props.navigation.navigate('AddCard', {title: 'Add Card', deckId: id});
	};

	startQuiz = ({ id, cards }) => {
		this.setState({
			action: ADD_QUIZ
		});
		const uuid = generateUUID();
		this.props.doAddQuizAction(uuid, {id, cards});
	};

	render() {
		const { navigation, deck } = this.props;
		const { decks } = deck;
		const deckId = navigation.getParam('id');
		const item = decks[deckId];
		return (
			<ScrollView style={styles.container}>
				<View style={styles.title}>
					<Text
						style={[styles.titleText]}
						placeholder="Deck Title">
						{item.title}
					</Text>
					<Text
						style={[styles.titleText, {fontSize: 20}]}
						placeholder="Deck Title">
						{Object.keys(item.cards).length} cards
					</Text>
				</View>
				<View style={styles.buttonArea}>
					<TouchableOpacity style={styles.button} title={'Submit'} onPress={() => this.addCard(item)}>
						<Text style={styles.buttonText}>Add Card</Text>
					</TouchableOpacity>
				</View>
				{
					Object.keys(item.cards).length !== 0 && (
						<View style={styles.buttonArea}>
							<TouchableOpacity style={styles.button} title={'Submit'} onPress={() => this.startQuiz(item)}>
								<Text style={styles.buttonText}>Start Quiz</Text>
							</TouchableOpacity>
						</View>
					)
				}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white
	},
	title: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 300,
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
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20
	},
	buttonText: {
		fontSize: 50,
		color: white
	}
});

function mapStateToProps(state) {
	return { deck : state.deck, quiz: state.quiz }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ doGetDecksAction, doAddQuizAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
