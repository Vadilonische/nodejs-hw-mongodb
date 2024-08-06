const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;
  const validContactTypes = ['work', 'home', 'personal'];
  if (validContactTypes.includes(contactType)) return contactType;
};

const parseBoolean = (isFavourite) => {
  if (typeof isFavourite !== 'boolean') return;
  return isFavourite;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
