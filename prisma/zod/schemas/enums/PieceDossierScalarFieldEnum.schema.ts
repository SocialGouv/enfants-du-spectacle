import { z } from 'zod';

export const PieceDossierScalarFieldEnumSchema = z.enum([
  'id',
  'dossierId',
  'externalId',
  'type',
  'link',
  'statut',
]);
