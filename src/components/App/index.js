
import {memo} from 'react';
import {Switch, Route, useLocation, Redirect} from 'react-router-dom';
import Main from '../Main';
import ProtectedRoutes from '../ProtectedRoutes';
import Login from '../Login';
import Chat from '../Chat';

const App = () => {
  const location = useLocation();
  return (
    <Main>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoutes>
          <Route exact path="/" render={() => <Redirect from={location.pathname} to="/chat" />} />
          <Route path="/chat" exact component={Chat} />
        </ProtectedRoutes>
      </Switch>
    </Main>
  );
};

export default memo(App);
