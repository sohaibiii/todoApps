import React, {Component} from 'react';
import {Provider} from 'react-redux';

import configureStore from './store';
const store = configureStore({});

const withProvider = Components =>
  class StoreProvider extends Component {
    render() {
      return (
        <Provider store={store}>
          <Components {...this.props} />
        </Provider>
      );
    }
  };

export default withProvider;
