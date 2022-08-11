import { ElementType } from '../schema/element-type.model';

export const LocalElementTypes: Array<ElementType> = [
  {
    uri: 'novel',
    name: 'Novel'
  },
  {
    uri: 'fiction',
    name: 'Fiction'
  },
  {
    uri: 'science',
    name: 'Science'
  },
  {
    uri: 'misc',
    name: 'Misc.'
  }
];

export const JapaneseElementTypes: Array<ElementType> = [
  {
    uri: 'novel@japan',
    name: 'Novel'
  },
  {
    uri: 'fiction@japan',
    name: 'Fiction'
  },
  {
    uri: 'science@japan',
    name: 'Science'
  },
  {
    uri: 'haiku@japan',
    name: 'Haiku'
  }
];
