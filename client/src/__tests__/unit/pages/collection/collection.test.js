import React from 'react';
import { shallow } from 'enzyme';
import { capitalize, values } from 'lodash';
import { CollectionPage, mapStateToProps } from '../../../../pages/collection/collection.component';
import * as shopSelectors from '../../../../redux/shop/shop.selectors';
import getMockedState from '../../../utils/mock-state-provider';

describe('Pages: Collection Page', () => {
  const initialState = getMockedState(['shop']);
  const collection = values(initialState.shop.collections)[0];

  describe('Collection Page', () => {
    const wrapper = shallow(<CollectionPage collection={collection} />);

    it('should render collection items', () => {
      expect(wrapper.find('Connect(CollectionItem)')).toHaveLength(collection.items.length);
    });

    it('should render title', () => {
      expect(wrapper.find('CollectionPageTitle').text()).toEqual(capitalize(collection.title));
    });
  });

  xdescribe('mapStateToProps', () => {
    it('should map state', () => {
      const selectCollectionMock = jest.spyOn(shopSelectors, 'selectCollection');
      selectCollectionMock.mockImplementation(() => initialState.shop.collections[0]);

      expect(mapStateToProps(initialState)).toContainEntry(['collection', collection]);
    });
  });
});
