import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './homepage.component';

describe('Pages: Homepage', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<HomePage />);

    expect(wrapper).toMatchSnapshot();
  });
});
