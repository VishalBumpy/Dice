import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import App from './App';
import { LogBox } from 'react-native';

class RootComponent extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    LogBox.ignoreAllLogs(true);
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default RootComponent;
