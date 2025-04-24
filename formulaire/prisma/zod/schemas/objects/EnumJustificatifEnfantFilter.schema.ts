import { z } from 'zod';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { NestedEnumJustificatifEnfantFilterObjectSchema } from './NestedEnumJustificatifEnfantFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnumJustificatifEnfantFilter> = z
  .object({
    equals: z.lazy(() => JustificatifEnfantSchema).optional(),
    in: z
      .union([
        z.lazy(() => JustificatifEnfantSchema).array(),
        z.lazy(() => JustificatifEnfantSchema),
      ])
      .optional(),
    notIn: z
      .union([
        z.lazy(() => JustificatifEnfantSchema).array(),
        z.lazy(() => JustificatifEnfantSchema),
      ])
      .optional(),
    not: z
      .union([
        z.lazy(() => JustificatifEnfantSchema),
        z.lazy(() => NestedEnumJustificatifEnfantFilterObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnumJustificatifEnfantFilterObjectSchema = Schema;
