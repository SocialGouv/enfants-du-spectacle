import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantCreateManyInput> = z
  .object({
    id: z.number().optional(),
    enfantId: z.number(),
    dossierId: z.number().optional().nullable(),
    externalId: z.string().optional().nullable(),
    type: z.lazy(() => JustificatifEnfantSchema),
    link: z.string(),
    statut: z
      .lazy(() => STATUT_PIECESchema)
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierEnfantCreateManyInputObjectSchema = Schema;
