import styled, { css } from 'styled-components';

const mainColor = 'black';
const subColor = 'grey';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

const isInputHasValue = ({ inputValue }) => {
  if (inputValue.length) {
    return shrinkLabelStyles;
  }
};

export const FormTextareaGroupContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

FormTextareaGroupContainer.displayName = 'FormInputGroupContainer';

export const FormTextareaContainer = styled.textarea`
  background: none;
    background-color: white;
    color: ${subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${subColor};
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ label {
      ${shrinkLabelStyles};
    }
`;

FormTextareaContainer.displayName = 'FormInputContainer';

export const FormTextareaLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${isInputHasValue}
`;

FormTextareaLabel.displayName = 'FormInputLabel';
