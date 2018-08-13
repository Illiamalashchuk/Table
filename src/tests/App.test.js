import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import renderer from 'react-test-renderer';
import changeNumbers from '../middleware/change';
import saveCookies from '../middleware/setCookies';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import App, {addTable, setAllValues, setHighlight} from '../App';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

export const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      changeNumbers, 
      saveCookies,
    ),
  ),
);


describe('App component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

