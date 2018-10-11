import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import Record from './components/Record';
import { white, purple } from "./utils/colors";
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { setLocalNotification } from "./utils/helper";


const SimpleStatusBar = ({backgroundColor, ...props}) => (
	<View style={{backgroundColor, height: Constants.statusBarHeight}}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props}/>
	</View>
);

const Tabs = createBottomTabNavigator({
	Decks: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Decks',
		},
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: 'Add Deck',
		},
	},
	Record: {
		screen: Record,
		navigationOptions: {
			tabBarLabel: 'Record',
		},
	},
}, {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? white : purple,
		style: {
			height: 50,
			backgroundColor: Platform.OS === 'ios' ? purple : white,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1,
			paddingBottom: 8
		},
		labelStyle: {
			fontSize: 25,
		}
	}
});

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	DeckDetail: {
		screen: DeckDetail,
	},
	AddCard: {
		screen: AddCard,
	},
	Quiz: {
		screen: Quiz,
		navigationOptions: {
			header: null
		}
	}
});

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
const store = createStore(reducers, /* preloadedState, */ applyMiddleware(thunk));

class Main extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}}>
					<SimpleStatusBar backgroundColor={white} barStyle={'dark-content'}/>
					<MainNavigator />
				</View>
			</Provider>
		);
	}
}

export default Main;
