const _ = require('lodash');
const Chance = require('chance');
const moment = require('moment');
const { MAX_ITEMS_COUNT, PREVIEW_ITEMS_NUMBER } = require('../support/constants');
const getMockedState = require('../../utils/mock-state-provider');

const chance = new Chance();
const { shop } = getMockedState(['shop']);

const getRandomCount = (minValue, maxValue) => _.sample(_.range(minValue, maxValue));

const getProductsMap = (products, productsCount = 1, minItemsCount = 1) => {
  const productsToMap = _.sampleSize(products, productsCount);

  return _.map(productsToMap, (product) => (
    {
      ...product,
      count: getRandomCount(minItemsCount, MAX_ITEMS_COUNT),
    }
  ));
};

const getCollectionProducts = (collection, isPreview) => (
  (isPreview)
    ? _.take(collection.items, PREVIEW_ITEMS_NUMBER)
    : collection.items
);

const getRandomCollection = () => _.sample(_.values(shop.collections));

const getRandomSection = (directorySections) => _.sample(directorySections);

const getTargetProductsCount = (products) => (_.reduce(products, (current, next) => (
  current + next.count
), 0)).toString(10);

const getAllProducts = () => _.flatten(_.map(_.values(shop.collections), 'items'));

const getRandomProduct = () => _.sample(getAllProducts());

const getTimestamp = () => moment().valueOf();

const getUniqueName = () => `user-${getTimestamp()}`;

const getUniqueEmail = () => `${getUniqueName()}@mail.com`;

const getUniquePassword = () => `secret-${getTimestamp()}`;

const getValidRandomPhoneNumber = () => chance.phone({ country: 'us', formatted: false });

module.exports = {
  getProductsMap,
  getRandomCount,
  getCollectionProducts,
  getTargetProductsCount,
  getRandomCollection,
  getRandomProduct,
  getAllProducts,
  getRandomSection,
  getUniqueEmail,
  getUniqueName,
  getUniquePassword,
  getValidRandomPhoneNumber,
};
