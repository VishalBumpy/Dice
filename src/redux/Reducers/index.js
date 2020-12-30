import { combineReducers } from 'redux';
import players from './playersReducer';
import playersList from './playersListReducer';
import maxScore from './maxScoreReducer';
import { CLEAR_STORE } from '../Actions/ActionTypes';

const appReducer = combineReducers({
  players: players,
  maxScore: maxScore,
  playersList,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined; // to clear the redux state when user logout
  }
  return appReducer(state, action);
};

export default rootReducer;
