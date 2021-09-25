import {memo, useState, useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import authService from '../../services/authService';
import { useDispatch } from 'react-redux';
import { successLogin } from '../../actions/userActions';

import './styles.scss';

const Main = ({children}) => {
  const [loading, updateLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const validate = async () => {
      const isUserLogged = await authService.checkAuthenticatedUser();
      if (isUserLogged) {
        dispatch(successLogin(isUserLogged));
      }
      updateLoading(false);
    }
    validate();
  }, []);
  return loading ? (
    <div className="main-container">
      <Spinner animation="border" />
    </div>
  ) : children;
};

export default memo(Main);
