const _ = require('lodash');
const { MAX_ITEMS_COUNT, PREVIEW_ITEMS_NUMBER } = require('../support/constants');

const getRandomCount = (maxValue) => _.sample(_.range(maxValue));

const getProductsMap = (products, count) => {
  const productsToMap = _.sampleSize(products, count);

  return _.map(productsToMap, (product) => (
    {
      ...product,
      count: getRandomCount(MAX_ITEMS_COUNT),
    }
  ));
};

const getPreviewProducts = (collections) => (
  _.flatten(_.map(collections, (collection) => (
    _.take(collection.items, PREVIEW_ITEMS_NUMBER)
  ))));

const getTargetProductsCount = (products) => (_.reduce(products, (current, next) => (
  current + next.count
), 0)).toString(10);

module.exports = {
  getProductsMap, getRandomCount, getPreviewProducts, getTargetProductsCount,
};
