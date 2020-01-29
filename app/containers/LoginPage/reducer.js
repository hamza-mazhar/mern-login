import produce from 'immer';
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_PENDING,
} from './constants';

// The initial state of the App
export const initialState = {
  data: '',
  loading: false,
  error: false,
  msg: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_USER_FAIL:
        draft.loading = false;
        draft.error = true;
        draft.msg = 'Fail to login Invalid Email or Password!';
        break;
      case LOGIN_USER_SUCCESS:
        draft.loading = false;
        draft.data = action.payload.data;
        draft.error = false;
        draft.msg = action.payload.data.message;
        break;
      case LOGIN_USER_PENDING:
        draft.loading = false;
        draft.data = '';
        draft.msg = action.msg;
        break;
    }
  });

export default loginReducer;
