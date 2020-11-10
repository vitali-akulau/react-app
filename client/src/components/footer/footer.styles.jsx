import styled from 'styled-components';

export const FooterContainer = styled.div`
  height: 200px;
  padding: 20px 87.5px;
  border-top: 0.5px solid grey;
  display: flex;
  justify-content: center;
`;

export const FooterLinksContainer = styled.div`
  width: 75%;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const LinksColumnContainer = styled.div`
  & ul {
    padding: unset;
  }
  
  & li {
    list-style: none;
  }
`
