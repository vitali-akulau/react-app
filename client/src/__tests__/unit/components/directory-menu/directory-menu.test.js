import React from 'react';
import { shallow } from 'enzyme';
import { omit } from 'lodash';
import { DirectoryMenu, mapStateToProps } from '../../../../components/directory-menu/directory-menu.component';
import getMockedState from "../../../utils/mock-state-provider";

describe('Components: Directory Menu', () => {
  const initialState = getMockedState(['directory']);

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
