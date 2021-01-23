import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CartIconContainer, ShoppingIconContainer, ItemCountContainer } from './cart-icon.styles';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

export const CartIcon = ({ toggleCartDropdown, itemsCount }) => (
  <CartIconContainer onClick={toggleCartDropdown} >
    <ShoppingIconContainer />
    <ItemCountContainer data-test="cart-items-counter">{itemsCount}</ItemCountContainer>
  </CartIconContainer>
);

export const mapDispatchToProps = (dispatch) => ({
  toggleCartDropdown: () => dispatch(toggleCartDropdown()),
});

export const mapStateToProps = createStructuredSelector({
  itemsCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
