import React from 'react';
import { shallow } from 'enzyme';
import { values, omit } from 'lodash';
import { CollectionsOverview, mapStateToProps } from '../../../../components/collections-overview/collections-overview.component';
import getMockedState from "../../../utils/mock-state-provider";

describe('Components: Collection Overview', () => {
  const initialState = getMockedState(['shop']);
  const collections = values(initialState.shop.collections);

  describe('Collection Overview', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CollectionsOverview collections={collections} />);
    });

    it('should render all collection previews', () => {
      expect(wrapper.find('CollectionPreview')).toHaveLength(collections.length);
    });

    it('should pass props to collection previews', () => {
      const PREVIEW_ITEMS_NUMBER = 4;
      const expectedProps = (collection) => (
        { ...omit(collection, ['routeName', 'id']), previewItemsNumber: PREVIEW_ITEMS_NUMBER }
      );

      collections.forEach((collection, index) => {
        expect(wrapper.find('CollectionPreview').at(index).props()).toEqual(expectedProps(collection));
      });
    });
  });

  describe('mapStateToProps', () => {
    it('should map state', () => {
      expect(mapStateToProps(initialState)).toContainEntry(['collections', collections]);
    });
  });
});
