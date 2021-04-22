import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle,
} from './menu-item.styles';

export const MenuItem = ({
  title, imageUrl, size, history, linkUrl, match,
}) => {
  const makeSniсkers = (title) => (
    (title.toUpperCase() === 'SNEAKERS') ? 'SNICKERS' : title.toUpperCase()
  );

  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <BackgroundImageContainer imageUrl={imageUrl}/>
      <ContentContainer>
        <ContentTitle>{makeSniсkers(title)}</ContentTitle>
        <ContentSubtitle>SHOP NOW</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
}

export default withRouter(MenuItem);
