import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    dossierId: z.number(),
    externalId: z.string().optional().nullable(),
    type: z.lazy(() => JustificatifDossierSchema),
    link: z.string(),
    statut: z
      .lazy(() => STATUT_PIECESchema)
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierUncheckedCreateInputObjectSchema = Schema;
