import React from 'react';
import { shallow } from 'enzyme';
import { omit } from 'lodash';
import { DirectoryMenu, mapStateToProps } from './directory-menu.component';

describe('Components: Directory Menu', () => {
  const initialState = {
    directory: {
      sections: [
        {
          id: 1,
          title: 'Jeans',
          imageUrl: 'https://www.image-url-jeans.com',
          size: 'large',
          linkUrl: '/jeans',
        },
        {
          id: 2,
          title: 'Jackets',
          imageUrl: 'https://www.image-url-jackets.com',
          size: 'large',
          linkUrl: '/jackets',
        },
        {
          id: 3,
          title: 'Sneakers',
          imageUrl: 'https://www.image-url-sneakers.com',
          size: 'small',
          linkUrl: '/sneakers',
        },
      ],
    },
  };

  describe('Directory Menu', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<DirectoryMenu sections={initialState.directory.sections} />);
    });

    it('renders menu items', () => {
      expect(wrapper.find('withRouter(MenuItem)')).toHaveLength(initialState.directory.sections.length);
    });

    it('passes props to menu items', () => {
      initialState.directory.sections.forEach((menuItemData, index) => {
        expect(wrapper.find('withRouter(MenuItem)').at(index).props())
          .toEqual(omit(menuItemData, 'id'));
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState)).toContainEntry(['sections', initialState.directory.sections]);
    });
  });
});
