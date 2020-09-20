import React from "react";
import "./collection-preview.styles.scss"
import _ from "lodash"
import CollectionItem from "../collection-item/collection-item.component"

const CollectionPreview = ({ title, items, previewItemsNumber }) => {
  return (
    <div className='collection-preview' >
      <h1 className='title'>{_.toUpper(title)}</h1>
      <div className='preview'>
        {
          _.take(items, previewItemsNumber).map(({ id, name, price, imageUrl }) => (
            <CollectionItem key={id} name={name} price={price} imageUrl={imageUrl}/>
          ))
        }
      </div>
    </div>
  )
}

export default CollectionPreview
