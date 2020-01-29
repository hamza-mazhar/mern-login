import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the language domain
 */

const registerUser = () => initialState;

/**
 * Select the language locale
 */

const makeSelectRegister = state => {
  console.log('in the selectoe', state);
  return createSelector(registerUser);
};
export { registerUser, makeSelectRegister };
