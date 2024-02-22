import { type SchemaTypeDefinition } from 'sanity';

import post from './schemaTypes/post';
import user from './schemaTypes/user';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, user],
};
