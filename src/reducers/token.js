import { SAVE_TOKEN } from '../actions';

const initialStateToken = '';

export function token(state = initialStateToken, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return action.token;
  default:
    return state;
  }
}

export default token;
