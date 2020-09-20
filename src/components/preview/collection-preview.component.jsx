import React from "react";
import "./collection-preview.styles.scss"
import _ from "lodash"

const CollectionPreview = ({ title, items, previewItemsNumber }) => {
  return (
    <div className='collection-preview' >
      <h1 className='title'>{_.toUpper(title)}</h1>
      <div className='preview'>
        {
          _.take(items, previewItemsNumber).map(({ id, name }) => (
            <div className='item' key={id}>{name}</div>
          ))
        }
      </div>
    </div>
  )
}

export default CollectionPreview
