import { MAX_SCORE } from './ActionTypes';

export const maxScoreAction = (maxScore) => {
  return (dispatch, getState) =>
    dispatch({
      type: MAX_SCORE,
      payload: maxScore,
    });
};
