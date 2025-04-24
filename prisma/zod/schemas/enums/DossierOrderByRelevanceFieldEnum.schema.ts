import { z } from 'zod';

export const DossierOrderByRelevanceFieldEnumSchema = z.enum([
  'nom',
  'scenesSensibles',
  'presentation',
  'conventionCollectiveCode',
  'otherConventionCollective',
  'externalId',
]);
