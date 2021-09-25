import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './store';
import App from './components/App';

import './index.scss';

const store = createStore();

render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);
