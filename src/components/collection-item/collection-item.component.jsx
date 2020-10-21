import React from 'react';
import { connect } from 'react-redux';
import {
  CollectionItemContainer,
  CollectionItemImageContainer,
  CollectionFooterContainer,
  CollectionItemNameContainer,
  CollectionItemPriceContainer,
} from './collection-item.styles';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item, addItemToCart }) => {
  const { name, price } = item;

  return (
    <CollectionItemContainer>
      <CollectionItemImageContainer {...item} />
      <CollectionFooterContainer>
        <CollectionItemNameContainer>{name}</CollectionItemNameContainer>
        <CollectionItemPriceContainer>{price}</CollectionItemPriceContainer>
      </CollectionFooterContainer>
      <CustomButton onClick={() => addItemToCart(item)} inverted>Add to Cart</CustomButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
