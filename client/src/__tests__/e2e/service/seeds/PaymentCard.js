const dayjs = require('dayjs');
const paymentCards = require('../../fixtures/stripe-test-payment-cards');

const { visa: basicCard } = paymentCards.basic;

class PaymentCard {
  constructor({ number, cvv, expDate } = {}) {
    const cardExpirationDate = dayjs().add(6, 'month').format('MMYY');

    this.number = number || basicCard.number;
    this.cvv = cvv || basicCard.cvv;
    this.expDate = expDate || cardExpirationDate;
  }
}

module.exports = PaymentCard;
