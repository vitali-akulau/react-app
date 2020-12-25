import React from 'react';
import { shallow } from 'enzyme';
import { CollectionItem, mapDispatchToProps } from '../../../../components/collection-item/collection-item.component';
import { addItem } from '../../../../redux/cart/cart.actions';

describe('Components: Collection Item', () => {
  describe('Collection Item', () => {
    let wrapper;
    const collectionItem = {
      price: 25,
      imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
      name: 'Brown Brim',
      id: 1,
    };

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
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    it('should dispatch actions', () => {
      expect(JSON.stringify(mapDispatchToProps(dispatch)))
        .toEqual(JSON.stringify({ addItemToCart: addItem }));
    });
  });
});
