import React from 'react';

export const FormDropdown = ({ title, options, isListOpen }) => (
  <div className="dd-wrapper">
    <button
      type="button"
      className="dd-header"
    >
      <div className="dd-header-title">{title}</div>
      {
        isListOpen
          ? <div name="angle-up" size="2x" />
          : <div name="angle-down" size="2x" />
      }
    </button>
    {isListOpen && (
      <div
        role="list"
        className="dd-list"
      >
        {
          options.map((item) => (
            <button
              type="button"
              className="dd-list-item"
              key={item.id}
            >
              {item.title}
              {' '}
              {item.selected && <div name="check" />}
            </button>
          ))
        }
      </div>
    )}
  </div>
);
