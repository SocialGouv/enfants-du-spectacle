import { z } from 'zod';

export const SendListScalarFieldEnumSchema = z.enum([
  'id',
  'send',
  'lastSent',
  'commissionId',
  'userId',
]);
