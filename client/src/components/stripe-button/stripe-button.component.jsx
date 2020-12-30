import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export const onToken = (token, priceCents) => {
  axios({
    url: 'payment',
    method: 'post',
    data: {
      amount: priceCents,
      token,
    },
  })
    .then((res) => {
      alert('Payment Successful');
    })
    .catch((error) => {
      alert('Charge Error: Please check used payment card');
    });
};

const StripeCheckoutButton = ({ price }) => {
  const priceCents = price * 100;
  const publishableKey = 'pk_test_51Hag7FI9tl1qHiIwyhWu6oCZEFIIYaIrx7P9PoFAqHhtjjgkFOSlFzOs860gIaTRu4Xmutpz2oVhUPRx36VMk8aB00WCD0FEBb';

  return (
    <StripeCheckout
      label="Pay Now"
      name="React App Payments"
      image="https://sendeyo.com/up/d/f3eb2117da"
      billingAddress
      shippingAddress
      description={`Your total price is $${price}`}
      amount={priceCents}
      panelLabel="Pay Now"
      token={(token) => onToken(token, priceCents)}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
