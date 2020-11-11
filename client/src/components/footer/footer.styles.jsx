import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.div`
  height: 200px;
  padding: 0px 87.5px 20px;
  border-top: 0.5px solid #e3e1df;
  display: flex;
  justify-content: space-around;
`;

export const FooterColumnsContainer = styled.div`
  width: 60%;
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
    margin: 2px 0px;
  }
`

export const FooterImageContainer = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterLink = styled(Link)`
  cursor: pointer;
`
