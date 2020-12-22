import React from 'react';
import { shallow } from 'enzyme';
import WithSpinner from './with-spinner.component';

describe('', () => {
  let wrapper;
  const MockComponent = () => {};
  const WithSpinnerWrapper = WithSpinner(MockComponent);

  beforeEach(() => {
    wrapper = shallow(<WithSpinnerWrapper />);
  });

  it('should render spinner if loading is in progress', () => {
    wrapper.setProps({ isLoading: true });

    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('should render spinner if loading complete', () => {
    wrapper.setProps({ isLoading: false });

    expect(wrapper.find('MockComponent')).toHaveLength(1);
  });

  it('should pass props to wrapped component', () => {
    wrapper.setProps({ isLoading: false, 'data-test': 'test' });

    expect(wrapper.find('MockComponent').prop('data-test')).toEqual('test');
  });
});
