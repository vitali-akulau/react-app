import React from 'react';
import { shallow } from 'enzyme';
import CustomButton from './custom-button.component';

describe('Components: Custom Button', () => {
  let wrapper;
  const buttonText = 'Click Me';

  beforeEach(() => {
    wrapper = shallow(<CustomButton>{buttonText}</CustomButton>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders button text', () => {
    expect(wrapper.text()).toEqual(buttonText);
  });

  it('applies base button styles', () => {
    expect(wrapper).toHaveStyleRule('background-color', 'black');
    expect(wrapper).toHaveStyleRule('color', 'white');
    expect(wrapper).toHaveStyleRule('background-color', 'white', {
      modifier: ':hover',
    });
    expect(wrapper).toHaveStyleRule('color', 'black', {
      modifier: ':hover',
    });
  });

  it('applies base button styles on hover', () => {
    expect(wrapper).toHaveStyleRule('background-color', 'white', {
      modifier: ':hover',
    });
    expect(wrapper).toHaveStyleRule('color', 'black', {
      modifier: ':hover',
    });
    expect(wrapper).toHaveStyleRule('border', '1px solid black', {
      modifier: ':hover',
    });
  });

  it('applies inverted button styles', () => {
    wrapper.setProps({ inverted: true });

    expect(wrapper).toHaveStyleRule('background-color', 'white');
    expect(wrapper).toHaveStyleRule('color', 'black');
    expect(wrapper).toHaveStyleRule('border', '1px solid black');
  });

  it('applies inverted button styles on hover', () => {
    wrapper.setProps({ inverted: true });

    expect(wrapper).toHaveStyleRule('background-color', 'black', {
      modifier: ':hover',
    });
    expect(wrapper).toHaveStyleRule('color', 'white', {
      modifier: ':hover',
    });
    expect(wrapper).toHaveStyleRule('border', 'none', {
      modifier: ':hover',
    });
  });

  it('applies google sign in button styles', () => {
    wrapper.setProps({ isGoogleSignIn: true });

    expect(wrapper).toHaveStyleRule('background-color', '#4285f4');
    expect(wrapper).toHaveStyleRule('color', 'white');
  });

  it('applies google sign in button styles on hover', () => {
    wrapper.setProps({ isGoogleSignIn: true });

    expect(wrapper).toHaveStyleRule('background-color', '#357ae8', {
      modifier: ':hover',
    });
    expect(wrapper).toHaveStyleRule('border', 'none', {
      modifier: ':hover',
    });
  });
});
