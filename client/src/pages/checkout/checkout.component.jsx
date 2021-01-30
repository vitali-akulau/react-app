import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  CheckoutHeaderBlockContainer,
  CheckoutTotal,
  TestWarningContainer,
} from './checkout.styles';
import CheckoutCartItem from '../../components/checkout-cart-item/checkout-cart-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

export const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <CheckoutHeaderBlockContainer>
        <span>Product</span>
      </CheckoutHeaderBlockContainer>
      <CheckoutHeaderBlockContainer>
        <span>Description</span>
      </CheckoutHeaderBlockContainer>
      <CheckoutHeaderBlockContainer>
        <span>Quantity</span>
      </CheckoutHeaderBlockContainer>
      <CheckoutHeaderBlockContainer>
        <span>Price</span>
      </CheckoutHeaderBlockContainer>
      <CheckoutHeaderBlockContainer>
        <span>Remove</span>
      </CheckoutHeaderBlockContainer>
    </CheckoutHeaderContainer>
    {
      cartItems.map((item) => <CheckoutCartItem key={item.id} cartItem={item} />)
    }
    <CheckoutTotal data-test="checkout-total">{`Total: $${total}`}</CheckoutTotal>
    <TestWarningContainer>
      Your payment cards are
      <a href="https://stripe.com/docs/testing"> Stripe testing payment cards!</a>
    </TestWarningContainer>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

export const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
