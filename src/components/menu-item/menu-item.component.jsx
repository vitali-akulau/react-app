import _ from 'lodash'
import React from 'react';
import './menu-item.styles.scss'

const MenuItem = ({ title, id, imageUrl, size }) => {
  const subtitleAction = 'shop now'

  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={`${size} menu-item`}
      key={id}
    >
      <div className='content'>
        <h1 className='title'>{_.toUpper(title)}</h1>
        <span className='subtitle'>{_.toUpper(subtitleAction)}</span>
      </div>
    </div>
  )
}

export default MenuItem
