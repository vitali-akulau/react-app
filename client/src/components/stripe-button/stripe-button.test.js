import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import StripeCheckoutButton, { onToken } from './stripe-button.component';

jest.mock('axios');

describe('Components: Stripe Button', () => {
  const cartTotal = 100;

  describe('Component', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<StripeCheckoutButton price={cartTotal} />);
    });

    it('should have payment handler', () => {
      expect(wrapper.prop('token')).toBeInstanceOf(Function);
    });

    it('should transform amount to cents', () => {
      expect(wrapper.prop('amount')).toEqual(cartTotal * 100);
    });

    it('should render cart total', () => {
      expect(wrapper.prop('description')).toEqual(`Your total price is $${cartTotal}`);
    });

    it('should render cart total', () => {
      expect(wrapper.prop('image')).toEqual('https://sendeyo.com/up/d/f3eb2117da');
    });
  });

  describe('"onToken" handler', () => {
    const token = 'dssdadsa';
    const priceCents = 10000;
    const mockWindowAlert = jest.spyOn(window, 'alert');
    mockWindowAlert.mockImplementation(() => {});

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call payment service', () => {
      axios.mockImplementation(() => Promise.resolve());

      onToken(token, priceCents);
      expect(axios).toHaveBeenCalledTimes(1);
    });

    it('should call payment service with proper data', async () => {
      axios.mockImplementation(() => Promise.resolve());

      await onToken(token, priceCents);
      expect(axios).toHaveBeenCalledWith({ data: { token, amount: priceCents }, method: 'post', url: 'payment' });
    });
  });
});
