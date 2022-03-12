import { combineReducers } from 'redux';
import { player } from './user';
import { results } from './results';
import { token } from './token';
import { countdown } from './countdown';

export default combineReducers({ player, token, results, countdown });
