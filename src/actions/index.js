import { getTokenFromAPI } from '../services/API';

export const SAVE_TOKEN = 'SAVE_TOKEN';

const saveTokenToState = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const saveToken = () => async (dispatch) => {
  const token = await getTokenFromAPI();
  localStorage.setItem('token', token);
  dispatch(saveTokenToState(token));
};
