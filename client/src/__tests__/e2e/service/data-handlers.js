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

const getUpdatedProducts = (operation, products, product, count) => {
  const initialProducts = [...products];

  if (operation === 'remove') {
    return _.reject(initialProducts, { id: product.id });
  } if (operation === 'increase') {
    return _.map(initialProducts, (initialProduct) => {
      if (initialProduct.id === product.id) {
        return { ...initialProduct, count: initialProduct.count + count };
      }
      return { ...initialProduct };
    });
  } if (operation === 'reduce') {
    return _.map(initialProducts, (initialProduct) => {
      if (initialProduct.id === product.id) {
        return { ...initialProduct, count: initialProduct.count - count };
      }
      return { ...initialProduct };
    });
  }
};

module.exports = {
  filterProductsByNameSubstring,
  getProductNameSubstring,
  getCartTotal,
  getUpdatedProducts,
};
