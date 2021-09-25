import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './store';
import App from './components/App';

import './index.scss';

const store = createStore();

render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
