import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumJustificatifEnfantFilterObjectSchema } from './EnumJustificatifEnfantFilter.schema';
import { JustificatifEnfantSchema } from '../enums/JustificatifEnfant.schema';
import { EnumSTATUT_PIECENullableFilterObjectSchema } from './EnumSTATUT_PIECENullableFilter.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema),
        z.lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema),
        z.lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    nom: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    enfantId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    externalId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumJustificatifEnfantFilterObjectSchema),
        z.lazy(() => JustificatifEnfantSchema),
      ])
      .optional(),
    link: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    statut: z
      .union([
        z.lazy(() => EnumSTATUT_PIECENullableFilterObjectSchema),
        z.lazy(() => STATUT_PIECESchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierEnfantScalarWhereInputObjectSchema = Schema;
