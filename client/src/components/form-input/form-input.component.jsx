import React from 'react';
import { FormInputContainer, FormInputLabel, FormInputGroupContainer } from './form-input.styles';

const FormInput = ({ handleChange, label, ...otherInputProps }) => (
  <FormInputGroupContainer>
    <FormInputContainer onChange={handleChange} {...otherInputProps} />
    {
      label
        ? (<FormInputLabel inputValue={otherInputProps.value}>{label}</FormInputLabel>)
        : null
    }
  </FormInputGroupContainer>
);

export default FormInput;
