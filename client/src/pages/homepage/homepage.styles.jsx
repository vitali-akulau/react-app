import styled from 'styled-components';

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
  
  @media screen and (max-width: 800px) {
    padding: 20px 0px;
  }
`;

export default HomepageContainer;
