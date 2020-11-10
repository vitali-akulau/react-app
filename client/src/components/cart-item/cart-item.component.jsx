import React, { memo } from 'react';
import { CartItemContainer, ItemDetailsContainer, CartItemTextContainer } from './cart-item.styles';

const CartItem = ({
  item: {
    imageUrl, name, price, quantity,
  },
}) => (
  <CartItemContainer>
    <img src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <CartItemTextContainer>{name}</CartItemTextContainer>
      <CartItemTextContainer>{`${quantity}x${price}`}</CartItemTextContainer>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default memo(CartItem);
