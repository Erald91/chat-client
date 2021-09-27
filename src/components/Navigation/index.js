import {memo} from 'react';
import {useHistory} from 'react-router-dom';
import {Navbar, Container, NavDropdown} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {getUserData} from '../../selectors/userSelectors';
import {logoutUser} from '../../actions/userActions';

const Navigation = () => {
  const user = useSelector(getUserData);
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUser(history.push));
  };
  return (
    <Navbar className="navigation-container" bg="light">
      <Container>
        <Navbar.Brand>Ottonova Chat</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={user.displayName} id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default memo(Navigation);
