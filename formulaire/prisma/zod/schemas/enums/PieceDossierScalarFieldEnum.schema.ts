import { z } from 'zod';

export const PieceDossierScalarFieldEnumSchema = z.enum([
  'id',
  'nom',
  'dossierId',
  'externalId',
  'type',
  'link',
  'statut',
]);
