import * as _ from 'lodash';

const getProductsBySearchQuery = (collections, searchQuery) => {
  const allProducts = _.flatten(_.map(collections, 'items'));

  return _.filter(allProducts, ({ name }) => (
    _.toLower(name).includes(_.toLower(searchQuery))
  ));
};

export default getProductsBySearchQuery;
