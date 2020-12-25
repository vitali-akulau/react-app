import React from 'react';
import { shallow } from 'enzyme';
import SigningPage from './signing.component';

describe('Pages: Signing Page', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<SigningPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
