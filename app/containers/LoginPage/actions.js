import axios from 'axios';
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_PENDING,
} from './constants';

export function loginUserPending() {
  return {
    type: LOGIN_USER_PENDING,
  };
}
export function setErrorMsg(msg) {
  return { type: LOGIN_USER_FAIL, msg };
}

export function loginUserSuccess(data) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
}

export const loginUser = values => dispatch => {
  dispatch(loginUserPending());
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'api/login',
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .then(res => {
        resolve(dispatch(loginUserSuccess(res)));
        localStorage.setItem('token', `Bearer ${res.data.token}`);
        localStorage.setItem('login', true);
      })
      .catch(err => {
        localStorage.setItem('login', false);
        reject(
          dispatch(
            setErrorMsg(`Failed to get  application details:  + ${err}`),
          ),
        );
      });
  });
};
