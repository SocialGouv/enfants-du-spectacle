import { z } from 'zod';

export const PieceDossierEnfantScalarFieldEnumSchema = z.enum([
  'id',
  'nom',
  'enfantId',
  'externalId',
  'type',
  'link',
  'statut',
]);
