import React from 'react';

const ExternalLink = (props) => {
  const { children, href, ...otherProps } = props;

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`${href}`}
      {...otherProps}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
