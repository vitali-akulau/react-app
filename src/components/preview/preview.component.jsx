import React from "react";
import "./preview.styles.scss"
import _ from "lodash"

const Preview = ({ id, title, items }) => {
  const PREVIEW_ITEMS_NUMBER = 4

  return (
    <div className='preview' key={id}>
      <h1 className='title'>{title}</h1>
      {
        _.take(items, PREVIEW_ITEMS_NUMBER).map(({ id, name }) => (
          <div className='item' key={id}>
            <h2>{name}</h2>
          </div>
        ))
      }
    </div>
  )
}

export default Preview
