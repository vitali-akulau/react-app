import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px;
  
  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

HeaderContainer.displayName = 'HeaderContainer';

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 50px;
  
  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
`;

LogoContainer.displayName = 'LogoContainer';

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

OptionsContainer.displayName = 'OptionsContainer';

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

OptionLink.displayName = 'OptionLink';
