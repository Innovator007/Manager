import React from 'react';
import { I18nManager } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers/index';
import Router from './src/Router';

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDQAQDB-1YpnXaj2vzwKQhSv34apOz12Mo",
      authDomain: "manager-5ace9.firebaseapp.com",
      databaseURL: "https://manager-5ace9.firebaseio.com",
      projectId: "manager-5ace9",
      storageBucket: "manager-5ace9.appspot.com",
      messagingSenderId: "760861796287"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
          <Router />          
      </Provider>
    );
  }
}

