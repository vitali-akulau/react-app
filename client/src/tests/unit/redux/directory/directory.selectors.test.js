import { selectDirectory, selectDirectorySections } from '../../../../redux/directory/directory.selectors';

describe('Redux: Directory Selectors', () => {
  const mockState = {
    directory: {
      sections: [
        { name: 'section_name_1' },
        { name: 'section_name_2' },
      ],
    },
  };

  it('"selectDirectory" should return directory', () => {
    expect(selectDirectory(mockState)).toEqual(mockState.directory);
  });

  it('"selectDirectorySections" should return directory sections', () => {
    expect(selectDirectorySections(mockState)).toEqual(mockState.directory.sections);
  });
});
