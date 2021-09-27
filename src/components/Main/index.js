import {memo, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Navigation from '../Navigation';
import authService from '../../services/authService';
import {successLogin} from '../../actions/userActions';
import {isUserLogged} from '../../selectors/userSelectors';

const Main = ({children}) => {
  const isLogged = useSelector(isUserLogged);
  const [loading, updateLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const validate = async () => {
      const resposne = await authService.checkAuthenticatedUser();
      if (resposne) {
        dispatch(successLogin(resposne));
      }
      updateLoading(false);
    }
    validate();
  }, []);
  if (loading) {
    return (
      <div className="main-container-loader">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <Container fluid className="main-container-app">
      {isLogged && <Navigation />}
      {children}
    </Container>
  )
};

export default memo(Main);
