import {Redirect, useLocation} from 'react-router-dom';
import  PropTypes from 'prop-types';
import { isUserLogged } from '../../selectors/userSelectors';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({children}) => {
  const location = useLocation();
  const isLogged = useSelector(isUserLogged);
  if (!isLogged) {
    return <Redirect from={location.pathname} to="/login" />;
  }
  return children;
};

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoutes;
