const dayjs = require('dayjs');
const paymentCards = require('../../fixtures/stripe-test-payment-cards');

const { visa: basicCard } = paymentCards.basic;

class PaymentCard {
  constructor({
    number, cvv, expMonth, expYear,
  } = {}) {
    const cardExpirationDate = dayjs().add(6, 'month').format('MMYY');

    this.number = number || basicCard.number;
    this.cvv = cvv || basicCard.cvv;
    this.expDate = expMonth + expYear || cardExpirationDate;
    this.expMonth = expMonth || this.expDate.substring(0, 2);
    this.expYear = expYear || this.expDate.substring(2);
  }
}

module.exports = PaymentCard;
