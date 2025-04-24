import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumJustificatifEnfantNullableListFilter> = z
  .object({
    equals: z
      .lazy(() => JustificatifEnfantSchema)
      .array()
      .optional()
      .nullable(),
    has: z
      .lazy(() => JustificatifEnfantSchema)
      .optional()
      .nullable(),
    hasEvery: z
      .lazy(() => JustificatifEnfantSchema)
      .array()
      .optional(),
    hasSome: z
      .lazy(() => JustificatifEnfantSchema)
      .array()
      .optional(),
    isEmpty: z.boolean().optional(),
  })
  .strict();

export const EnumJustificatifEnfantNullableListFilterObjectSchema = Schema;
