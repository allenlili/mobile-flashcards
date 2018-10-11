import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import {blue, white, lightPurple, purple} from "../utils/colors";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doAddDeckAction } from '../reducers/deck.reducer';

class AddDeck extends Component {
	state = {
		deckTitle: '',
	};

	componentWillReceiveProps(nextProps) {
		const { code, deckId } = nextProps.deck;
		if (code === 'success') {
			const title = this.state.deckTitle;
			this.setState({
				deckTitle: '',
			});
			nextProps.navigation.navigate('DeckDetail', {id: deckId, title: title});
		}
	}

	submit() {
		const deckTitle = this.state.deckTitle;
		if (!deckTitle) {
			return;
		}
		this.props.doAddDeckAction(deckTitle);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text
						style={styles.titleText}
						placeholder="Deck Title"
					>New Deck</Text>
				</View>
				<ScrollView>
					<View style={styles.label}>
						<Text style={styles.labelText}>What is the title of your new deck?</Text>
					</View>
					<View style={styles.input}>
						<TextInput
							style={styles.inputText}
							placeholder={'deck title'}
							onChangeText={(text) => this.setState({deckTitle: text})}
							value={this.state.deckTitle}
						/>
					</View>
					<View style={styles.buttonArea}>
						<TouchableOpacity style={styles.button} title={'Submit'} onPress={() => this.submit()}>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
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
		alignItems: 'flex-end',
		height: 80,
		backgroundColor: 'skyblue',
		paddingRight: 10,
	},
	titleText: {
		fontSize: 50,
		color: 'white',
		fontWeight: 'bold'
	},
	label: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20
	},
	labelText: {
		fontSize: 50,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	input: {
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20
	},
	inputText: {
		width: '90%',
		fontSize: 42,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 10,
		borderColor: 'black',
		padding: 5
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
	return {
		deck: state.deck
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ doAddDeckAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);
