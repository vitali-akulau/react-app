import styled from 'styled-components';

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
`;

CollectionPageContainer.displayName = 'CollectionPageContainer';

export const CollectionPageTitle = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
`;

CollectionPageTitle.displayName = 'CollectionPageTitle';

export const CollectionPageItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  
  & > div {
    margin-bottom: 30px;
  }
`;

CollectionPageItemsContainer.displayName = 'CollectionPageItemsContainer';
