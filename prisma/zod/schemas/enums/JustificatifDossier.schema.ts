import { z } from 'zod';

export const JustificatifDossierSchema = z.enum([
  'SYNOPSIS',
  'SCENARIO',
  'MESURES_SECURITE',
  'PLAN_TRAVAIL',
  'INFOS_COMPLEMENTAIRES',
]);
