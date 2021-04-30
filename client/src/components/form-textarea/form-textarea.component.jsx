import React from 'react';
import { FormTextareaContainer, FormTextareaGroupContainer, FormTextareaLabel } from './form-textarea.styles';

const FormTextarea = ({ handleChange, label, ...otherInputProps }) => (
  <FormTextareaGroupContainer>
    <FormTextareaContainer onChange={handleChange} {...otherInputProps} />
    {
      label
        ? (<FormTextareaLabel inputValue={otherInputProps.value}>{label}</FormTextareaLabel>)
        : null
    }
  </FormTextareaGroupContainer>
);

export default FormTextarea;
