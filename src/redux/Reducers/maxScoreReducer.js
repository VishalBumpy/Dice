import { MAX_SCORE } from '../Actions/ActionTypes';

const initialState = null;

export default maxScoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAX_SCORE:
      return action.payload;
    default:
      return state;
  }
};
