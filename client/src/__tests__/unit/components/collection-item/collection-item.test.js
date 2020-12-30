import React from 'react';
import { shallow } from 'enzyme';
import { values } from 'lodash';
import { CollectionItem, mapDispatchToProps } from '../../../../components/collection-item/collection-item.component';
import { addItem } from '../../../../redux/cart/cart.actions';
import getMockedState from '../../../utils/mock-state-provider';

describe('Components: Collection Item', () => {
  describe('Collection Item', () => {
    let wrapper;
    const collectionItems = values(getMockedState(['shop']).shop.collections)[0].items;
    const [collectionItem] = collectionItems;

    beforeEach(() => {
      wrapper = shallow(<CollectionItem item={collectionItem} />);
    });

    it('should get item background image from proper resource', () => {
      expect(wrapper.find('CollectionItemImageContainer'))
        .toHaveStyleRule('background-image', `url(${collectionItem.imageUrl})`);
    });

    it('should show item name', () => {
      expect(wrapper.find('CollectionItemNameContainer').prop('children'))
        .toEqual(collectionItem.name);
    });

    it('should show item price', () => {
      expect(wrapper.find('CollectionItemPriceContainer').prop('children'))
        .toEqual(collectionItem.price);
    });

    it('should render "Add to cart" button', () => {
      expect(wrapper.find('CustomButton').prop('children'))
        .toEqual('Add to Cart');
    });

    it('should be able to add item to cart', () => {
      const addItemToCartMock = jest.fn();

      wrapper.setProps({ addItemToCart: addItemToCartMock });
      wrapper.find('CustomButton').prop('onClick')();

      expect(addItemToCartMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    it('should dispatch actions', () => {
      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ addItemToCart: addItem }));
    });
  });
});
