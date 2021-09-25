import AuthService from '../services/authService';

export const USER_LOGIN_SUCCESS = 'User/USER_LOGIN_SUCCESS';
export const successLogin = (payload) => ({type: USER_LOGIN_SUCCESS, payload});

export const USER_LOGIN_FAILED = 'User/USER_LOGIN_FAILED';
export const failedLogin = (payload) => ({type: USER_LOGIN_FAILED, payload});

export const USER_LOGIN = 'User/Login';
export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch({type: USER_LOGIN});
    const response = await AuthService.login(username, password);
    if (response.success) {
      dispatch(successLogin(response.data));
    } else {
      dispatch(failedLogin(response.error));
    }
  };
};
