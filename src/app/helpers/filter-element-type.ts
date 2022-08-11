import { ElementType } from '../services/main.service';

export const filterElementTypes = (elementTypes: Array<ElementType>): Array<ElementType> => {
  let _elementTypes = [];

  elementTypes.forEach((type) => {
    const uri = type.uri.split('@').shift();
    const matchElementTypes = _elementTypes.find((et) => et.uri === uri);

    if (!matchElementTypes) _elementTypes.push({ ...type, uri });
  });

  return _elementTypes;
};
