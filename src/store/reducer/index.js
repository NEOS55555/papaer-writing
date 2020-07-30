import { combineReducers, createStore, applyMiddleware } from 'redux';
// import createHistory from 'history/createBrowserHistory';
import editor from './editor'
import com from './com'
import search from './search'
import thunkMiddleware from 'redux-thunk'
// import createSagaMiddleware from 'redux-saga';
// import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

// const isDevelopment = process.env.NODE_ENV === 'development';
// const composeEnhancers = (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunkMiddleware];

const store = createStore(
	combineReducers({
		editor,
		com,
		search,
	}),
	(applyMiddleware(...middlewares))
);

export default store;