import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {createLogger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import futApp from './modules/futApp';

const loggerMiddleware = createLogger();

const reducer = combineReducers({
  futApp
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Redux Devtools extension options like:
      // name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    ReduxThunk,
    loggerMiddleware
  )
  //,  other store enhancers if any
);

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState || {},
    enhancer
  );
}

export default configureStore;
