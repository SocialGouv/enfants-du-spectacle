import { z } from 'zod';

export const CommentaireScalarFieldEnumSchema = z.enum([
  'id',
  'text',
  'date',
  'userId',
  'dossierId',
  'seen',
]);
