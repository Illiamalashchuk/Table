import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import cookieMiddleware from 'redux-effects-universal-cookie';
import changeNumbers from './middleware/change';
import reducers from './reducers'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'


const store = createStore(
    reducers, 
    composeWithDevTools(
        applyMiddleware(
            thunk,
            // cookieMiddleware(), // cookies middleware
            changeNumbers
        )
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

