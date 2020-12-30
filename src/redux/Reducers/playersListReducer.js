import { PLAYERS_LIST } from '../Actions/ActionTypes';

const initialState = {
  playersList: null,
};

export default playersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAYERS_LIST:
      return {
        ...state,
        playersList: action.payload,
      };
    default:
      return state;
  }
};
