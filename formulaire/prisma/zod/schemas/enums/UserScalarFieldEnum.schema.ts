import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'nom',
  'prenom',
  'email',
  'telephone',
  'fonction',
  'emailVerified',
  'createdAt',
  'updatedAt',
  'role',
  'departement',
  'departements',
]);
