import { UPDATE_COUNTDOWN, STOP_COUNTDOWN, RESET_COUNTDOWN } from '../actions';

const durationInSeconds = 30;

const INITIAL_STATE = {
  durationInSeconds,
  timer: durationInSeconds,
  isCountdownStopped: false,
};

export function countdown(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_COUNTDOWN:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case STOP_COUNTDOWN:
    return {
      ...state,
      isCountdownStopped: true,
    };
  case RESET_COUNTDOWN:
    return {
      ...state,
      timer: state.durationInSeconds,
      isCountdownStopped: false,
    };
  default:
    return state;
  }
}

export default countdown;
