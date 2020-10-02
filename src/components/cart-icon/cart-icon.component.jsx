import React from 'react';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';

const CartIcon = ({ toggleCartDropdown, itemsCount }) => (
  <div className="cart-icon" onClick={toggleCartDropdown}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemsCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartDropdown: () => dispatch(toggleCartDropdown()),
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
  itemsCount: _.values(cartItems).reduce((count, item) => count + item.quantity, 0),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
