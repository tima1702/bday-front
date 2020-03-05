import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Boot/router';
import * as serviceWorker from './serviceWorker';
import createStore from './Boot/createStore';
import { Provider } from 'react-redux';

const store = createStore();

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
