const _ = require('lodash');
const { MAX_ITEMS_COUNT, PREVIEW_ITEMS_NUMBER } = require('../support/constants');
const getMockedState = require('../../utils/mock-state-provider');

const { shop } = getMockedState(['shop']);
const { collections } = shop;

const getRandomCount = (minValue, maxValue) => _.sample(_.range(minValue, maxValue));

const getProductsMap = (products, productsCount, minItemsCount = 1) => {
  const productsToMap = _.sampleSize(products, productsCount);

  return _.map(productsToMap, (product) => (
    {
      ...product,
      count: getRandomCount(minItemsCount, MAX_ITEMS_COUNT),
    }
  ));
};

const getPreviewProducts = () => (
  _.flatten(_.map(collections, (collection) => (
    _.take(collection.items, PREVIEW_ITEMS_NUMBER)
  ))));

const getRandomCollectionName = (shopCollections) => _.sample(_.keys(shopCollections));

const getOverviewProducts = (collection) => shop.collections[collection].items;

const getTargetProductsCount = (products) => (_.reduce(products, (current, next) => (
  current + next.count
), 0)).toString(10);

const getAllProducts = () => _.flatten(_.map(_.values(shop.collections), 'items'));

const getRandomProduct = () => _.sample(getAllProducts());

module.exports = {
  getProductsMap,
  getRandomCount,
  getPreviewProducts,
  getTargetProductsCount,
  getRandomCollectionName,
  getOverviewProducts,
  getRandomProduct,
  getAllProducts,
};
