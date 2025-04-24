import { z } from 'zod';

export const CommissionScalarFieldEnumSchema = z.enum([
  'id',
  'departement',
  'date',
  'dateLimiteDepot',
  'lastSent',
  'archived',
]);
