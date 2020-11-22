import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import ExternalLink from '../external-link/external-link.component';

const linksSharedStyles = css`
  cursor: pointer;
`;

export const FooterContainer = styled.div`
  height: 200px;
  padding: 0px 0px 20px;
  border-top: 0.5px solid #e3e1df;
  
  @media screen and (max-width: 800px) {
    padding: 10px;
    margin-bottom: 10px;
  }
`;

export const FooterColumnsContainer = styled.div`
  width: 100%;
`;

export const LinksColumnContainer = styled.div`
  width: ${({ blocks }) => `${blocks ? parseInt(blocks, 10) * 16 : 16}%`};
  display: inline-block;
  text-align: ${({ textAlign }) => textAlign};
  display: inline-block;
  vertical-align: top;
  float: ${({ float }) => float};

  & ul {
    padding: unset;
  }
  
  & li {
    list-style: none;
    margin: 2px 0px;
  }
  
  @media screen and (max-width: 800px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const FooterLink = styled(Link)`
  ${linksSharedStyles}
`;

export const FooterExternalLink = styled(ExternalLink)`
  ${linksSharedStyles}
`;
