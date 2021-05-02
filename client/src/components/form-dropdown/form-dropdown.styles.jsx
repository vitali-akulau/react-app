import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  background: white;
  margin: 10px 0 10px 0;
`;

DropdownWrapper.displayName = 'DropdownWrapper';

export const DropdownHeaderButton = styled.button`
  background: white;
  width: 100%;
`;

DropdownHeaderButton.displayName = 'DropdownHeaderButton';

export const DropdownTitle = styled.div`
  
`;

DropdownTitle.displayName = 'DropdownTitle';

export const DropdownListContainer = styled.div`
  width: 376px;
  position: fixed;
  z-index: 1;
  overflow: hidden;
`;

DropdownListContainer.displayName = 'DropdownListContainer';

export const DropdownOptionButton = styled.button`
  width: 100%;
  text-align: left;
`;

DropdownOptionButton.displayName = 'DropdownOptionButton';
