import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceCents = price * 100;
  const publishableKey = 'pk_test_51Hag7FI9tl1qHiIwyhWu6oCZEFIIYaIrx7P9PoFAqHhtjjgkFOSlFzOs860gIaTRu4Xmutpz2oVhUPRx36VMk8aB00WCD0FEBb';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Successful!');
  };

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
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
