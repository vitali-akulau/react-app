import React from 'react';
import { shallow } from 'enzyme';
import DirectoryMenu from './directory-menu.component';
import { store } from '../../redux/store';

describe('Components: Directory Menu', () => {
  it('attempt', () => {
    const wrapper = shallow(<DirectoryMenu store={store} />).dive().dive();

    expect(wrapper).toMatchSnapshot();
  });
});
