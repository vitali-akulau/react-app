import React from 'react';
import { connect } from 'react-redux';
import {
  CheckoutItemContainer,
  CheckoutItemImageContainer,
  NameContainer,
  QuantityContainer,
  PriceContainer,
  ArrowContainer,
  ValueContainer,
  RemoveButton,
} from './checkout-cart-item.styles';
import { addItem, clearItemFromCart, removeItem } from '../../redux/cart/cart.actions';

export const CheckoutCartItem = ({
  cartItem, addItem, clearItem, removeItem,
}) => {
  const {
    name, imageUrl, price, quantity, id,
  } = cartItem;
  return (
    <CheckoutItemContainer data-test={`checkout-item-${id}`}>
      <CheckoutItemImageContainer>
        <img src={imageUrl} alt="checkout cart item" />
      </CheckoutItemImageContainer>
      <NameContainer>{name}</NameContainer>
      <QuantityContainer>
        <ArrowContainer
          onClick={() => removeItem(cartItem)}
          data-test="item-reduce-count"
        >
          &#10094;
        </ArrowContainer>
        <ValueContainer>{quantity}</ValueContainer>
        <ArrowContainer
          onClick={() => addItem(cartItem)}
          data-test="item-increase-count"
        >
          &#10095;
        </ArrowContainer>
      </QuantityContainer>
      <PriceContainer>{price}</PriceContainer>
      <RemoveButton
        onClick={() => clearItem(cartItem)}
        data-test="item-remove"
      >
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutCartItem);
