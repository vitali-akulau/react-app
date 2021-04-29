import directoryReducer, { INITIAL_STATE } from '../../../../redux/directory/directory.reducer';

describe('Redux: Directory Reducer', () => {
  it('should return initial state', () => {
    expect(directoryReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should return initial state if unrecognized action provided', () => {
    const unrecognizedAction = { type: 'DO_SOMETHING', payload: 'payload' };

    expect(directoryReducer(undefined, unrecognizedAction)).toEqual(INITIAL_STATE);
  });
});
