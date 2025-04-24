import { z } from 'zod';
import { NatureCachetSchema } from '../enums/NatureCachet.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationUncheckedCreateWithoutEnfantInput> =
  z
    .object({
      id: z.number().optional(),
      typeRemuneration: z.string().optional().nullable(),
      natureCachet: z
        .lazy(() => NatureCachetSchema)
        .optional()
        .nullable(),
      autreNatureCachet: z.string().optional().nullable(),
      montant: z.number().optional().nullable(),
      nombre: z.number().optional().nullable(),
      nombreLignes: z.number().optional().nullable(),
      totalDadr: z.number().optional().nullable(),
      comment: z.string().optional().nullable(),
    })
    .strict();

export const RemunerationUncheckedCreateWithoutEnfantInputObjectSchema = Schema;
