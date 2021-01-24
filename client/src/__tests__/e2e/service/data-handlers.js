const _ = require('lodash');
const { getAllProducts } = require('./data-providers');

const filterProductsByNameSubstring = (substring) => (
  _.filter(getAllProducts(), (p) => p.name.includes(substring))
);

const getProductNameSubstring = (name) => _.sample(name.split(' '));

module.exports = {
  filterProductsByNameSubstring,
  getProductNameSubstring,
};
