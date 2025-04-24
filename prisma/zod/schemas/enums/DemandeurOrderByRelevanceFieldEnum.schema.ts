import { z } from 'zod';

export const DemandeurOrderByRelevanceFieldEnumSchema = z.enum([
  'email',
  'nom',
  'prenom',
  'phone',
  'fonction',
]);
