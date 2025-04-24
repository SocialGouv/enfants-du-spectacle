import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierCreateManyDossierInput> = z
  .object({
    id: z.number().optional(),
    nom: z.string(),
    externalId: z.string().optional().nullable(),
    type: z.lazy(() => JustificatifDossierSchema),
    link: z.string().optional().nullable(),
    statut: z
      .lazy(() => STATUT_PIECESchema)
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierCreateManyDossierInputObjectSchema = Schema;
