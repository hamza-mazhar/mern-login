import axios from 'axios';
import {
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_PENDING,
} from './constants';

export function registerUserPending() {
  console.log('in pending state');
  return {
    type: REGISTER_USER_PENDING,
  };
}
export function setErrorMsg(msg) {
  return { type: REGISTER_USER_FAIL, msg };
}

export function registerUserSuccess(data) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
}

export const registerUser = values => {
  console.log('here get the value in reg action=========>', values);
  return dispatch => {
    dispatch(registerUserPending());
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'api/signup',
        data: {
          name: values.username,
          email: values.email,
          password: values.password,
        },
      })
        .then(res => {
          resolve(dispatch(registerUserSuccess(res)));
          console.log('response getting here', res);
          //   localStorage.setItem('register', true);
        })
        .catch(err => {
          localStorage.setItem('register', false);
          reject(
            dispatch(setErrorMsg(`Failed to get  application details: ${err}`)),
          );
        });
    });
  };
};
