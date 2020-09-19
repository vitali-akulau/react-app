import React from 'react';
import './shop.styles.scss'
import SHOP_DATA from "./shop.data";
import Preview from "../../components/preview/preview.component";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    }
  }

  render() {
    return (
      <div className='shop-page'>
        <h1 className='title'>Shop Page</h1>
        <div className='collection-preview'>
          {
            this.state.collections.map(({ id, title , items}) => (
              <Preview key={id} title={title} items={items}>

              </Preview>
            ))
          }
        </div>
      </div>
    )
  }
}

export default ShopPage
