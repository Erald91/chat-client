import {memo} from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {isUserLogged} from '../../selectors/userSelectors';

const Login = () => {
  const isLogged = useSelector(isUserLogged);
  const location = useLocation();
  if (isLogged) {
    return <Redirect from={location.pathname} to="/chat" />
  }
  return <div>Login component...</div>;
};

export default memo(Login);
