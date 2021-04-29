import React from 'react';
import { shallow } from 'enzyme';
import { values } from 'lodash';
import CollectionPreview from '../../../../components/preview/collection-preview.component';
import getMockedState from "../../../utils/mock-state-provider";

describe('Components: Collection Preview', () => {
  let wrapper;
  const initialState = getMockedState(['shop']);
  const [collection] = values(initialState.shop.collections);
  const previewItemsNumber = 2;

  beforeAll(() => {
    wrapper = shallow(<CollectionPreview
      title={collection.title}
      items={collection.items}
      previewItemsNumber={previewItemsNumber}
    />);
  });

  it('should render collection title', () => {
    expect(wrapper.find('CollectionPreviewTitle').text()).toEqual(collection.title.toUpperCase());
  });

  it('should render supposed amount of items', () => {
    expect(wrapper.find('Connect(CollectionItem)')).toHaveLength(previewItemsNumber);
  });

  it('should add link to collection overview', () => {
    expect(wrapper.find('CollectionPreviewTitle').prop('to')).toEqual(`/shop/${collection.title.toLowerCase()}`);
  });

  it('should pass item data to collection item component', () => {
    expect(wrapper.find('Connect(CollectionItem)').at(0).prop('item')).toEqual(collection.items[0]);
  });
});
