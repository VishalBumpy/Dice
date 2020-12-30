import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './Reducers';

const middleWare = [thunk, logger];

const store = createStore(rootReducer, {}, compose(applyMiddleware(...middleWare)));

export default store;
