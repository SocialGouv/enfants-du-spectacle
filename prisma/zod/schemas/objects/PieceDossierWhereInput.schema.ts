import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumJustificatifDossierFilterObjectSchema } from './EnumJustificatifDossierFilter.schema';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { EnumSTATUT_PIECENullableFilterObjectSchema } from './EnumSTATUT_PIECENullableFilter.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';
import { DossierRelationFilterObjectSchema } from './DossierRelationFilter.schema';
import { DossierWhereInputObjectSchema } from './DossierWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PieceDossierWhereInputObjectSchema),
        z.lazy(() => PieceDossierWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PieceDossierWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PieceDossierWhereInputObjectSchema),
        z.lazy(() => PieceDossierWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
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
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    statut: z
      .union([
        z.lazy(() => EnumSTATUT_PIECENullableFilterObjectSchema),
        z.lazy(() => STATUT_PIECESchema),
      ])
      .optional()
      .nullable(),
    dossier: z
      .union([
        z.lazy(() => DossierRelationFilterObjectSchema),
        z.lazy(() => DossierWhereInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PieceDossierWhereInputObjectSchema = Schema;
