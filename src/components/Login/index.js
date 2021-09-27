import {memo, useState, useRef, useEffect} from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {isUserLogged, isLoginProgress, getLoginError} from '../../selectors/userSelectors';
import {Row, Container, Col, Form, Spinner} from 'react-bootstrap';
import Button from '../Button';
import Alerting from '../Alerting';
import {loginUser} from '../../actions/userActions';

const Login = () => {
  const dispatch = useDispatch();

  const isProgress = useSelector(isLoginProgress);
  const isLogged = useSelector(isUserLogged);
  const loginError = useSelector(getLoginError);
  useEffect(() => {
    setShowAlert(!!loginError);
  }, [loginError]);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const location = useLocation();

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      dispatch(loginUser(usernameRef.current.value, passwordRef.current.value));
    }
    setValidated(true);
  };
  if (isLogged) {
    return <Redirect from={location.pathname} to="/chat" />
  }
  return (
    <Container fluid>
      <Row className="login-container_main-row">
        <Col md={{span: 4, offset: 4}} sm={{span: 6, offset: 3}} xs={{span: 8, offset: 2}} className="login-container_main-row_form-col">
          <Container fluid>
            <Row>
              <h2 className="login-form-header text-center">Log In</h2>
            </Row>
            <Row>
              {showAlert && (
                <Alerting
                  variant="danger"
                  onClose={() => setShowAlert(false)}
                  content={loginError}
                />
              )}
            </Row>
            <Row>
              <Form noValidate validated={validated} onSubmit={event => onSubmit(event)}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Control
                    required
                    ref={usernameRef}
                    className="custom-input"
                    type="text"
                    placeholder="Username"
                    disabled={isProgress}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide username.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controlId="password">
                  <Form.Control
                    required
                    ref={passwordRef}
                    className="custom-input"
                    type="password"
                    placeholder="Password"
                    disabled={isProgress}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isProgress}>
                  {isProgress ? <Spinner animation="border" as="span" role="status" size="sm" /> : 'Submit'}
                </Button>
              </Form>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Login);
