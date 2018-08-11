import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import changeNumbers from './middleware/change';
import saveCookies from './middleware/setCookies';
import reducers from './reducers';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';



const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      changeNumbers, 
      saveCookies,
    ),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'),
);
