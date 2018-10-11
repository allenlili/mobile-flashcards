import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native';
import { white, black, red } from "../utils/colors";
import { AppLoading } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doGetDecksAction } from '../reducers/deck.reducer';
import {clearLocationNotification, setLocalNotification, timeToString} from "../utils/helper";
import {doGetQuizzesAction} from "../reducers/quiz.reducer";

class Deck extends Component {
	state = {
		bounceValue: new Animated.Value(1)
	};

	render() {
		const { bounceValue } = this.state;
		const {styles, onPress, deck} = this.props;
		return (
			<TouchableOpacity key={deck.id} style={styles.deck} onPress={onPress}>
				<Animated.Text style={[styles.deckTitle, {transform: [{scale: bounceValue}]}]}>{deck.title}</Animated.Text>
				{
					deck.cards ? (
						<Text style={styles.deckNumCard}>{`${Object.keys(deck.cards).length} cards`}</Text>
					) : (
						<Text style={styles.deckNumCard}>{`0 cards`}</Text>
					)
				}
			</TouchableOpacity>
		)
	}
}

class DeckList extends Component {

	componentDidMount() {
		this.props.doGetDecksAction();
		this.props.doGetQuizzesAction();
	}

	componentWillReceiveProps(nextProps) {
		const {quizzes} = this.props.quiz;
		if (quizzes) {
			const rt = quizzes[timeToString()];
			if (!rt) {
				setLocalNotification();
			} else {
				clearLocationNotification();
			}
		}
	}

	onPress({id, title}) {
		this.props.navigation.navigate('DeckDetail', {id, title});
	}

	render() {
		const { deck } = this.props;
		let { decks } = deck;
		if (!decks) {
			return (<AppLoading/>);
		}
		decks = Object.keys(decks).map((key) => ({key: decks[key].id, obj: decks[key]}));
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.titleText}>Decks</Text>
				</View>
				<View>
					<FlatList
						data={decks}
						renderItem={({ item }) =>
							<Deck key={item.id} styles={styles} deck={item.obj} onPress={() => this.onPress(item.obj)}/>}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white,
		paddingBottom: 50
	},
	title: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		height: 80,
		backgroundColor: 'skyblue',
		paddingLeft: 10,
		borderWidth: 1,
		borderColor: 'skyblue'
	},
	titleText: {
		fontSize: 50,
		color: 'white',
		fontWeight: 'bold'
	},
	deck: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'white',
		borderWidth: 3,
		height: 200
	},
	deckTitle: {
		fontSize: 40,
		color: 'black',
		fontWeight: 'bold'
	},
	deckNumCard: {
		fontSize: 20,
		color: 'black',
		marginTop: 10
	}
});

function mapStateToProps(state) {
	return { deck : state.deck, quiz: state.quiz  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ doGetDecksAction, doGetQuizzesAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
