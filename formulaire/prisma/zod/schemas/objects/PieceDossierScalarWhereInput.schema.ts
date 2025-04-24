import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumJustificatifDossierFilterObjectSchema } from './EnumJustificatifDossierFilter.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { EnumSTATUT_PIECENullableFilterObjectSchema } from './EnumSTATUT_PIECENullableFilter.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierScalarWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PieceDossierScalarWhereInputObjectSchema),
        z.lazy(() => PieceDossierScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PieceDossierScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PieceDossierScalarWhereInputObjectSchema),
        z.lazy(() => PieceDossierScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    nom: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    dossierId: z
      .union([z.lazy(() => IntFilterObjectSchema), z.number()])
      .optional(),
    externalId: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    type: z
      .union([
        z.lazy(() => EnumJustificatifDossierFilterObjectSchema),
        z.lazy(() => JustificatifDossierSchema),
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

export const PieceDossierScalarWhereInputObjectSchema = Schema;
