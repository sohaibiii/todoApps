import {applyMiddleware, createStore, compose} from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducer from './reducers';

const configureStore = initialState => {
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = applyMiddleware(thunk);

  // const persistConfig = {
  //   key: 'root',
  //   storage,
  // };

  // const persistedReducer = persistReducer(persistConfig, reducer);

  // const store = createStore(
  //   persistedReducer,
  //   initialState,
  //   composeEnhancers(middleware),
  // );

  const store = createStore(reducer, initialState, middleware);

  // const persistor = persistStore(store)
  // .purge();

  // return { store, persistor }
  return store;
};

export default configureStore;
