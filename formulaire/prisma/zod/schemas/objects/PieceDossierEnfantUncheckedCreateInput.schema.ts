import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    nom: z.string(),
    enfantId: z.number(),
    externalId: z.string().optional().nullable(),
    type: z.lazy(() => JustificatifEnfantSchema),
    link: z.string().optional().nullable(),
    statut: z
      .lazy(() => STATUT_PIECESchema)
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierEnfantUncheckedCreateInputObjectSchema = Schema;
