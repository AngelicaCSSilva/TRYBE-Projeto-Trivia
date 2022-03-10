import { ADD_EMAIL_NAME, SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
}

const initialStateToken = {};

export function token(state = initialStateToken, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return action.token;
  default:
    return state;
  }
}