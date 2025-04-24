import { z } from 'zod';

export const PieceDossierEnfantScalarFieldEnumSchema = z.enum([
  'id',
  'enfantId',
  'dossierId',
  'externalId',
  'type',
  'link',
  'statut',
]);
