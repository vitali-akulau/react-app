import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../../components/spinner/spinner.component';

describe('Components: Spinner', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<Spinner />);

    expect(wrapper).toMatchSnapshot();
  });
});
