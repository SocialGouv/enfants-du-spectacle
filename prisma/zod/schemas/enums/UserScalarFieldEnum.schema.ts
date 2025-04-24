import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'nom',
  'prenom',
  'email',
  'emailVerified',
  'image',
  'role',
  'departement',
  'departements',
]);
