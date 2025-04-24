import { z } from 'zod';

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  'id',
  'identifier',
  'token',
  'expires',
]);
