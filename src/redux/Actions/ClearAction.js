import { CLEAR_STORE } from './ActionTypes';

export function clearAction() {
  return (dispatch, getState) => {
    return dispatch(clear());
  };
}

function clear() {
  return {
    type: CLEAR_STORE,
  };
}
