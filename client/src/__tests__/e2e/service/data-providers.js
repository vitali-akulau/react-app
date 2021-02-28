const _ = require('lodash');
const Chance = require('chance');
const moment = require('moment');
const { PREVIEW_ITEMS_NUMBER } = require('../support/constants');
const getMockedState = require('../../utils/mock-state-provider');

const chance = new Chance();
const { shop } = getMockedState(['shop']);

const getRandomCount = (minValue, maxValue) => _.sample(_.range(minValue, maxValue));

const getCollectionProducts = (collection, isPreview) => (
  (isPreview)
    ? _.take(collection.items, PREVIEW_ITEMS_NUMBER)
    : collection.items
);

const getRandomCollection = () => _.sample(_.values(shop.collections));

const getRandomSection = (directorySections) => _.sample(directorySections);

const getAllProducts = () => _.flatten(_.map(_.values(shop.collections), 'items'));

const getRandomProduct = () => _.sample(getAllProducts());

const getTimestamp = () => moment().valueOf();

const getUniqueName = () => `user-${getTimestamp()}`;

const getUniqueEmail = () => `${getUniqueName()}@mail.com`;

const getUniquePassword = () => `secret-${getTimestamp()}`;

const getValidRandomPhoneNumber = () => chance.phone({ country: 'us', formatted: false });

module.exports = {
  getRandomCount,
  getCollectionProducts,
  getRandomCollection,
  getRandomProduct,
  getAllProducts,
  getRandomSection,
  getUniqueEmail,
  getUniqueName,
  getUniquePassword,
  getValidRandomPhoneNumber,
};
