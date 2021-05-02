import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import {
  DropdownWrapper,
  DropdownHeaderButton,
  DropdownListContainer,
  DropdownOptionButton,
} from './form-dropdown.styles';

export const FormDropdown = ({ dropdownTitle, options }) => {
  const [listState, toggleList] = useState({ listTitle: dropdownTitle, isListOpen: false });
  const { listTitle, isListOpen } = listState;

  const selectItem = (item) => {
    const { title } = item;

    toggleList({ ...listState, listTitle: title, isListOpen: !isListOpen });
  };

  return (
    <DropdownWrapper>
      <DropdownHeaderButton
        type="button"
        className="dd-header"
        onClick={() => toggleList({ ...listState, isListOpen: !isListOpen })}
      >
        <div className="dd-header-title">{listTitle}</div>
        {
          isListOpen
            ? <FontAwesome name="angle-up" size="2x" />
            : <FontAwesome name="angle-down" size="2x" />
        }
      </DropdownHeaderButton>
      {isListOpen && (
        <DropdownListContainer role="list">
          {
            options.map((item) => (
              <DropdownOptionButton
                type="button"
                key={item.id}
                onClick={() => selectItem(item)}
              >
                {item.title}
                {' '}
                {item.selected && <FontAwesome name="check" />}
              </DropdownOptionButton>
            ))
          }
        </DropdownListContainer>
      )}
    </DropdownWrapper>
  );
};
