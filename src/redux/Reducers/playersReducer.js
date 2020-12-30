import { NO_OF_PLAYERS } from '../Actions/ActionTypes';

const initialState = null;

export default playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case NO_OF_PLAYERS:
      return action.payload;
    default:
      return state;
  }
};
