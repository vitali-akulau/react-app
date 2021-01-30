import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DirectoryMenuContainer from './directory-menu.styles';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';

export const DirectoryMenu = ({ sections }) => (
  <DirectoryMenuContainer id="directory-menu">
    {
      sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))
    }
  </DirectoryMenuContainer>
);

export const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(DirectoryMenu);
