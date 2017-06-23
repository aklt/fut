import React, { Component } from 'react';
import { Provider } from 'react-redux';
import FutAppContainer from './containers/futAppContainer.js';
import configureStore from './redux/configureStore.js';

import '../node_modules/normalizecss/normalize.css';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FutAppContainer />
      </Provider>
    );
  }
}

export default App;
