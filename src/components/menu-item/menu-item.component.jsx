import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  MenuItemContainer, MenuItemBackgroundImage, ContentContainer, ContentTitle, ContentSubtitle,
} from './menu-item.styles';

const MenuItem = ({
  title, id, imageUrl, size, history, match, linkUrl,
}) => {
  const subtitleAction = 'shop now';

  return (
    <MenuItemContainer
      size={size}
      key={id}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <MenuItemBackgroundImage imageUrl={imageUrl} />
      <ContentContainer>
        <ContentTitle>{_.toUpper(title)}</ContentTitle>
        <ContentSubtitle>{_.toUpper(subtitleAction)}</ContentSubtitle>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default withRouter(MenuItem);
