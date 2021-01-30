import React, { memo } from 'react';
import { CartItemContainer, ItemDetailsContainer, CartItemTextContainer } from './cart-item.styles';

const CartItem = ({
  item: {
    imageUrl, name, price, quantity, id,
  },
}) => (
  <CartItemContainer data-test={`cart-item-${id}`}>
    <img src={imageUrl} alt="item" />
    <ItemDetailsContainer>
      <CartItemTextContainer data-test={`item-name-${id}`}>
        {name}
      </CartItemTextContainer>
      <CartItemTextContainer data-test={`item-total-${id}`}>
        {`${quantity}x${price}`}
      </CartItemTextContainer>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default memo(CartItem);
