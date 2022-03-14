import { ADD_EMAIL_NAME, SAVE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

export function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL_NAME:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
