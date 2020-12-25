import React from 'react';
import { shallow } from 'enzyme';
import CollectionPreview from '../../../../components/preview/collection-preview.component';

describe('Components: Collection Preview', () => {
  let wrapper;
  const collectionTitle = 'Products';
  const previewItemsNumber = 2;
  const productItems = [
    {
      name: 'jeans',
      id: 4,
    },
    {
      name: 'boots',
      id: 3,
    },
    {
      name: 'jacket',
      id: 22,
    },
    {
      name: 'hoodie',
      id: 12,
    },
  ];

  beforeAll(() => {
    wrapper = shallow(<CollectionPreview
      title={collectionTitle}
      previewItemsNumber={previewItemsNumber}
      items={productItems}
    />);
  });

  it('should render collection title', () => {
    expect(wrapper.find('CollectionPreviewTitle').text()).toEqual(collectionTitle.toUpperCase());
  });

  it('should render supposed amount of items', () => {
    expect(wrapper.find('Connect(CollectionItem)')).toHaveLength(previewItemsNumber);
  });

  it('should add link to collection overview', () => {
    expect(wrapper.find('CollectionPreviewTitle').prop('to')).toEqual(`/shop/${collectionTitle.toLowerCase()}`);
  });

  it('should pass item data to collection item component', () => {
    expect(wrapper.find('Connect(CollectionItem)').at(0).prop('item')).toEqual(productItems[0]);
  });
});
