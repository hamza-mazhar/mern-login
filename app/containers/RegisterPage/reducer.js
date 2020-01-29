/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_PENDING,
} from './constants';

// The initial state of the App
export const initialState = {
  data: '',
  loading: false,
  error: false,
  msg: '',
};

/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REGISTER_USER_FAIL:
        draft.loading = false;
        draft.error = true;
        draft.msg = 'Fail to Register Email is pre-register!';
        break;
      case REGISTER_USER_SUCCESS:
        draft.loading = false;
        draft.data = action.payload.data;
        draft.error = false;
        draft.msg = action.payload.data.message;
        break;
      case REGISTER_USER_PENDING:
        draft.loading = false;
        draft.data = '';
        draft.msg = action.msg;
        break;
    }
  });

export default registerReducer;
