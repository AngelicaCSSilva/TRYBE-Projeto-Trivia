const durationInSeconds = 30;

const INITIAL_STATE = {
  durationInSeconds,
  timer: durationInSeconds,
  isCountdownStopped: false,
};

export function countdown(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default countdown;
