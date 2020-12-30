import styled from 'styled-components';
import FormInput from '../form-input/form-input.component';
import { ReactComponent as SearchLogo } from '../../static/search.svg';

export const SearchInputContainer = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid darkgrey;
  align-items: center;
`;

SearchInputContainer.displayName = 'SearchInputContainer';

export const FormInputContainer = styled(FormInput)`
  border-bottom: none;
  margin: 0px;
  font-family: inherit;
  font-size: 18px;
  color: black;
`;

FormInputContainer.displayName = 'FormInputContainer';

export const SearchIconContainer = styled(SearchLogo)`
  height: 50%;
  width: 48px;
`;

SearchIconContainer.displayName = 'SearchIconContainer';
