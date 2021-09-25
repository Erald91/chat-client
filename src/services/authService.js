import {clearProps} from '../utils/helpers';

const USERS_TABLE = Object.freeze([
  {username: 'ottonovachatclient#1', password: 'somesecretcode#1', displayName: 'Ottonova Client #1'},
  {username: 'ottonovachatclient#2', password: 'somesecretcode#2', displayName: 'Ottonova Client #2'}
]);

export default (() => {
  const login = async (username, password) => {
    // Add some latency to emulate HTTP response delay
    await new Promise(resolve => setTimeout(resolve, 1.2 * 1000));
    return [
      USERS_TABLE.find(record => record.username === username && record.password === password)
    ]
      .filter(record => record)
      .reduce(
        (response, record) => ({success: true, data: clearProps(record, ['password']), error: null}),
        {success: false, data: null, error: `Username or password is incorrect`}
      )
  }
  return {
    login
  };
})();
