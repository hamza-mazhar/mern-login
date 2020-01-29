import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the language domain
 */

const loginUser = () => initialState;

/**
 * Select the language locale
 */

const makeSelectLogin = () => createSelector(loginUser);

export { loginUser, makeSelectLogin };
