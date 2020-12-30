import mockedState from './fixtures/mocked-state';

const getMockedState = (stateProps) => {
  if (!stateProps) {
    return mockedState;
  } if (stateProps.length === 1 && !mockedState[stateProps[0]]) {
    return {};
  }

  const state = {};

  stateProps.forEach((prop) => {
    if (mockedState[prop]) {
      state[prop] = mockedState[prop];
    } else {
      throw new Error('Target property does not exist');
    }
  });

  return state;
};

export default getMockedState;
