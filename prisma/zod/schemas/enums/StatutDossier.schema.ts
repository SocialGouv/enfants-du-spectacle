import { z } from 'zod';

export const StatutDossierSchema = z.enum([
  'CONSTRUCTION',
  'INSTRUCTION',
  'PRET',
  'AVIS_AJOURNE',
  'AVIS_FAVORABLE',
  'AVIS_FAVORABLE_SOUS_RESERVE',
  'AVIS_DEFAVORABLE',
  'ACCEPTE',
  'REFUSE',
]);
