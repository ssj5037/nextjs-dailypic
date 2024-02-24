import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn, token } from '../env';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}
