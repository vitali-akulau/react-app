const _ = require('lodash');
const { getAllProducts, getRandomCount } = require('./data-providers');
const { MAX_ITEMS_COUNT } = require('../support/constants');

const filterProductsByNameSubstring = (substring) => {
  const regExp = new RegExp(`${substring}`, 'i');

  return _.filter(getAllProducts(), (p) => regExp.test(p.name));
};

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

const getProductsMap = (products, productsCount = 1, minItemsCount = 1) => {
  const productsToMap = _.sampleSize(products, productsCount);

  return _.map(productsToMap, (product) => (
    {
      ...product,
      count: getRandomCount(minItemsCount, MAX_ITEMS_COUNT),
    }
  ));
};

const getTargetProductsCount = (products) => (_.reduce(products, (current, next) => (
  current + next.count
), 0)).toString(10);

module.exports = {
  filterProductsByNameSubstring,
  getProductNameSubstring,
  getCartTotal,
  getUpdatedProducts,
  getProductsMap,
  getTargetProductsCount,
};
