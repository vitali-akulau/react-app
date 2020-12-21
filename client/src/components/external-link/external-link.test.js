import React from 'react';
import { shallow } from 'enzyme';
import ExternalLink from './external-link.component';

describe('Components: External Link', () => {
  let wrapper;
  const linkText = '3rd party resource';
  const link = 'https://www.google.com';

  beforeEach(() => {
    wrapper = shallow(<ExternalLink href={link}>{linkText}</ExternalLink>);
  });

  it('should add proper link', () => {
    expect(wrapper.prop('href')).toEqual(link);
  });

  it('should render proper link text', () => {
    expect(wrapper.text()).toEqual(linkText);
  });

  it('should set link to "no follow" by search engines', () => {
    expect(wrapper.prop('rel')).toEqual('noopener noreferrer');
  });

  it('should set link to be opened in a new tab', () => {
    expect(wrapper.prop('target')).toEqual('_blank');
  });

  it('should add props', () => {
    const otherProps = { 'data-test': 'external-link' };
    wrapper.setProps(otherProps);
    expect(wrapper.prop('data-test')).toEqual('external-link');
  });
});
