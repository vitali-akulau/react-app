const _ = require('lodash');
const { getAllProducts } = require('./data-providers');

const filterProductsByNameSubstring = (substring) => (
  _.filter(getAllProducts(), (p) => p.name.includes(substring))
);

const getProductNameSubstring = (name) => _.sample(name.split(' '));

const getCartTotal = (targetProducts) => (
  _.reduce(targetProducts, (current, next) => (
    current + next.count * next.price
  ), 0)
);

module.exports = {
  filterProductsByNameSubstring,
  getProductNameSubstring,
  getCartTotal,
};
