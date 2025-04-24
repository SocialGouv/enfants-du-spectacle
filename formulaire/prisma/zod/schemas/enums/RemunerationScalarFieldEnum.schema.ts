import { z } from 'zod';

export const RemunerationScalarFieldEnumSchema = z.enum([
  'id',
  'typeRemuneration',
  'natureCachet',
  'autreNatureCachet',
  'montant',
  'nombre',
  'nombreLignes',
  'totalDadr',
  'comment',
  'enfantId',
]);
