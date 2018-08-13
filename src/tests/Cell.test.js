import React from 'react';
import { shallow } from 'enzyme';
import Cell from '../Cell';
import renderer from 'react-test-renderer';


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Cell component', () => {
  it('unhighlighted status', () => {
    const cell = renderer
    .create(<Cell highlight={false} isEnterForPercent={false}/>)
    .toJSON()
    expect(cell).toMatchSnapshot();
  });

  it('highlighted status', () => {
    const cell = renderer
    .create(<Cell highlight={true} isEnterForPercent={false}/>)
    .toJSON()
    expect(cell).toMatchSnapshot();
  });

  it('highlighted for percent', () => {
    const cell = renderer
    .create(<Cell highlight={false} isEnterForPercent={true}/>)
    .toJSON()
    expect(cell).toMatchSnapshot();
  });

});

