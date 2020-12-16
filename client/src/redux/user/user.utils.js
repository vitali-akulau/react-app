export const setCurrentUser = (snapshot) => (
  {
    id: snapshot.id,
    ...snapshot.data,
  }
);
