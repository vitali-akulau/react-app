import React from 'react';
import './shop.styles.scss'
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/preview/collection-preview.component";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    }
  }

  render() {
    const PREVIEW_ITEMS_NUMBER = 4

    return (
      <div className='shop-page'>
        <h1>Shop Page</h1>
          {
            this.state.collections.map(({ id, title , items}) => (
              <CollectionPreview key={id} title={title} items={items} previewItemsNumber={PREVIEW_ITEMS_NUMBER} />
            ))
          }
      </div>
    )
  }
}

export default ShopPage
