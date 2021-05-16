import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native';
import firebase from 'firebase/app';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducre from './redux/reducers';
import thunk from 'redux-thunk';

import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';

const store = createStore(rootReducre, applyMiddleware(thunk));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvi01V2iFunN2DfvA2mZk5GpKpIqaFFcM",
  authDomain: "instagram-dev-3adea.firebaseapp.com",
  projectId: "instagram-dev-3adea",
  storageBucket: "instagram-dev-3adea.appspot.com",
  messagingSenderId: "984647833608",
  appId: "1:984647833608:web:cc7ad455f85fdd1af799bd",
  measurementId: "G-8HV990HJYN"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


const Stack = createStackNavigator();


export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {

    const { loggedIn, loaded } = this.state;

    if(!loaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen}  navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App;