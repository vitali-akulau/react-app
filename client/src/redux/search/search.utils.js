import * as _ from 'lodash';
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const getProductsBySearchQuery = (snapshot, searchQuery) => {
  const collections = convertCollectionsSnapshotToMap(snapshot);
  const allProducts = _.flatten(_.map(collections, 'items'));

  return _.filter(allProducts, ({ name }) => (
    _.toLower(name).includes(_.toLower(searchQuery))
  ));
};
