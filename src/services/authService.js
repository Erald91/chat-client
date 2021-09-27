import {clearProps, genUniqueID} from '../utils/helpers';
import browserLocalStorage from './localStorage';

const USERS_TABLE = Object.freeze([
  {username: 'chatclient#1', password: 'somesecretcode#1', displayName: 'Client #1'},
  {username: 'chatclient#2', password: 'somesecretcode#2', displayName: 'Client #2'}
]);

export const userStorage = browserLocalStorage('user');

export default (() => {
  const login = async (username, password) => {
    // Add some latency to emulate HTTP response delay
    await new Promise(resolve => setTimeout(resolve, 1.2 * 1000));
    return [
      USERS_TABLE.find(record => record.username === username && record.password === password)
    ]
      .filter(record => record)
      .reduce(
        (response, record) => {
          const data = {...clearProps(record, ['password']), token: genUniqueID};
          userStorage.set(data);
          return {success: true, data, error: null};
        },
        {success: false, data: null, error: `Username or password is incorrect`}
      )
  }
  const tokenHealthCheck = async (token) => {
    // Add some latency to emulate HTTP response delay
    await new Promise(resolve => setTimeout(resolve, 2 * 1000));
    return {success: false};
  };
  const checkAuthenticatedUser = async () => {
    const data = userStorage.get();
    if (!data) {
      return false;
    }
    const isTokenValid = await tokenHealthCheck(data.token);
    if (isTokenValid) {
      return data;
    } else {
      userStorage.remove();
      return false;
    }
  };
  const clearLocalData = () => {
    userStorage.remove();
  };
  return {
    login,
    tokenHealthCheck,
    checkAuthenticatedUser,
    clearLocalData
  };
})();
