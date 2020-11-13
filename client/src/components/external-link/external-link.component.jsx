import React from 'react';

const ExternalLink = (props) => {
  const { children, href, ...otherProps } = props;

  return (
    <a
      rel="noreferrer"
      target="_blank"
      href={`${href}`}
      {...otherProps}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
