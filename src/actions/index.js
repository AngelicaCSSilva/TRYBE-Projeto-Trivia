import { getTokenFromAPI } from '../services/API';

export const ADD_EMAIL_NAME = 'ADD_EMAIL_NAME';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export function addEmailAndNameToState(objectEmailName) {
  return {
    type: ADD_EMAIL_NAME,
    payload: objectEmailName,
  };
}

const saveTokenToState = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const saveToken = () => async (dispatch) => {
  const token = await getTokenFromAPI();
  localStorage.setItem('token', token);
  dispatch(saveTokenToState(token));
};
