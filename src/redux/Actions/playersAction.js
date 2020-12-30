import { NO_OF_PLAYERS } from './ActionTypes';

export const playersAction = (players) => {
  return (dispatch, getState) =>
    dispatch({
      type: NO_OF_PLAYERS,
      payload: players,
    });
};
