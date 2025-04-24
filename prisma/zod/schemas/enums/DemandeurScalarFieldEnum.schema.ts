import { z } from 'zod';

export const DemandeurScalarFieldEnumSchema = z.enum([
  'id',
  'email',
  'nom',
  'prenom',
  'phone',
  'fonction',
  'societeProductionId',
]);
