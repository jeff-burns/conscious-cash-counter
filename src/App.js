import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import configureStore from './configureStore';

const store = configureStore();

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDDnpW9wkkddvEab0IigmWXO9eTwYfZAlI',
            authDomain: 'consciouscashcounter.firebaseapp.com',
            databaseURL: 'https://consciouscashcounter.firebaseio.com',
            projectId: 'consciouscashcounter',
            storageBucket: 'consciouscashcounter.appspot.com',
            messagingSenderId: '427262250451'
          };
          firebase.initializeApp(config);
    }

  render() {

    

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
export default App;
