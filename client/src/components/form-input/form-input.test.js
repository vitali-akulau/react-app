import React from 'react';
import { shallow, mount } from 'enzyme';
import FormInput from './form-input.component';

describe('Components: Form Input', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FormInput />);
  });

  it('should pass handler to input', () => {
    const dataHandler = () => {};
    wrapper.setProps({ handleChange: dataHandler });

    expect(wrapper.find('FormInputContainer').prop('onChange')).toBeInstanceOf(Function);
  });

  it('should render input label if passed', () => {
    const labelText = 'Field Label';
    wrapper.setProps({ label: 'Field Label' });

    expect(wrapper.find('FormInputLabel').text()).toEqual(labelText);
  });

  it('should not render input label if is not passed', () => {
    expect(wrapper.find('FormInputLabel')).toHaveLength(0);
  });

  it('should get input value to label from props', () => {
    const inputValue = 'user input';
    const labelText = 'Field Label';
    wrapper.setProps({ value: inputValue, label: labelText });

    expect(wrapper.find('FormInputLabel').prop('inputValue')).toEqual(inputValue);
  });
});
