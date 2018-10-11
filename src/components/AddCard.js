import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { white } from "../utils/colors";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doAddCardAction } from '../reducers/deck.reducer';

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	};

	static navigationOptions = ({ navigation }) => {
		const title = navigation.getParam('title', 'NO-ID');
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
				color: white
			},
		};
	};

	componentWillReceiveProps(nextProps) {
		const { code, deckId } = nextProps.deck;
		if (code === 'success') {
			const id = this.props.navigation.getParam('deckId');
			const title = this.props.navigation.getParam('title');
			nextProps.navigation.navigate('DeckDetail', {id: deckId, title: title});
		}
	}

	submit() {
		if (!this.state.question || !this.state.answer) {
			return;
		}
		const deckId = this.props.navigation.getParam('deckId');
		const card = { question: this.state.question, answer: this.state.answer };
		this.props.doAddCardAction(deckId, card);
		this.setState({
			question: '',
			answer: ''
		});
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<ScrollView>
					<View style={styles.input}>
						<TextInput
							style={styles.inputText}
							placeholder={'question'}
							onChangeText={(text) => this.setState({question: text})}
							value={this.state.question}
						/>
					</View>
					<View style={styles.input}>
						<TextInput
							style={styles.inputText}
							placeholder={'answer'}
							onChangeText={(text) => this.setState({answer: text})}
							value={this.state.answer}
						/>
					</View>
					<View style={styles.buttonArea}>
						<TouchableOpacity style={styles.button} title={'Submit'} onPress={() => this.submit()}>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		)
	}
}

function mapStateToProps(state) {
	return {
		deck: state.deck
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ doAddCardAction }, dispatch);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: white
	},
	title: {
		justifyContent: 'center',
		alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
