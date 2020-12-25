import styled from 'styled-components';

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  
  @media screen and (max-width: 800px) {
    padding: 20px 0px;
  }
`;

HomepageContainer.displayName = 'HomepageContainer';

export default HomepageContainer;
