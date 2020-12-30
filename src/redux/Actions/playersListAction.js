import { PLAYERS_LIST } from './ActionTypes';

export const playersListAction = (playersList) => {
  return (dispatch, getState) =>
    dispatch({
      type: PLAYERS_LIST,
      payload: playersList,
    });
};
