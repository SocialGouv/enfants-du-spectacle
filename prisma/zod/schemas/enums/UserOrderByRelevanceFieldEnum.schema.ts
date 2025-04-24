import { z } from 'zod';

export const UserOrderByRelevanceFieldEnumSchema = z.enum([
  'name',
  'nom',
  'prenom',
  'email',
  'image',
  'departement',
  'departements',
]);
