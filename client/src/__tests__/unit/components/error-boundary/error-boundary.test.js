import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../../../../components/error-boundary/error-boundary.component';

describe('Components: Error Boundary', () => {
  let wrapper;
  const errorText = 'Something went wrong...';
  const errorImageUrl = 'https://i.imgur.com/3suxlvm.png';
  const childNodeText = 'Some text';

  beforeEach(() => {
    wrapper = shallow(<ErrorBoundary><div>{childNodeText}</div></ErrorBoundary>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('has "hasErrored" set to "false" be default', () => {
    expect(wrapper.state().hasErrored).toEqual(false);
  });

  it('updates state if error', () => {
    const MockComponent = () => null;
    const error = new Error('some error');
    const mockOnError = jest.spyOn(console, 'log');
    mockOnError.mockImplementation();
    wrapper = shallow(<ErrorBoundary><MockComponent /></ErrorBoundary>);
    wrapper.find('MockComponent').simulateError(error);

    expect(wrapper.state().hasErrored).toEqual(true);
  });

  it('renders error text', () => {
    wrapper.setState({ hasErrored: true });

    expect(wrapper.find('ErrorImageText').text()).toEqual(errorText);
  });

  it('renders error text', () => {
    wrapper.setState({ hasErrored: true });

    expect(wrapper.find('ErrorImageContainer').prop('imageUrl')).toEqual(errorImageUrl);
  });

  it('renders children if no error', () => {
    wrapper.setState({ hasErrored: false });

    expect(wrapper.find('div').text()).toEqual(childNodeText);
  });

  it('does NOT render error block if no error', () => {
    wrapper.setState({ hasErrored: false });

    expect(wrapper.find('ErrorImageOverlay')).toEqual({});
  });
});
