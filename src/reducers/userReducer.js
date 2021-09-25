import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, USER_LOGIN } from "../actions/userActions";

const initialState = {
  current: null,
  fetching: false,
  error: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        current: action.payload,
        fetching: false,
        error: null
      };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    case USER_LOGIN:
      return {
        ...state,
        fetching: true,
        error: false
      }
    default:
      return state;
  };
};

export default user;
