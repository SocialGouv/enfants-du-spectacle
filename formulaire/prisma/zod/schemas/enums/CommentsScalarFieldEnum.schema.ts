import { z } from 'zod';

export const CommentsScalarFieldEnumSchema = z.enum([
  'id',
  'text',
  'source',
  'dossierId',
  'enfantId',
  'commentsId',
  'userId',
  'externalUserId',
  'sender',
  'seen',
  'date',
]);
