import React from 'react';
import './shop.styles.scss'
import SHOP_DATA from "./shop.data";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = SHOP_DATA
  }

  render() {
    return (
      <div className='shop-page'>
        <h1 className='title'>Shop Page</h1>
        <div className='collection-preview'>
          <div className='preview'>
            <h1 className='title'>Preview Title</h1>
            <div className='item'>
              <h2>Item title</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShopPage
