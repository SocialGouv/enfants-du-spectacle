import { z } from 'zod';
import { JustificatifDossierSchema } from '../enums/JustificatifDossier.schema';
import { STATUT_PIECESchema } from '../enums/STATUT_PIECE.schema';
import { DossierCreateNestedOneWithoutPiecesDossierInputObjectSchema } from './DossierCreateNestedOneWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierCreateInput> = z
  .object({
    externalId: z.string().optional().nullable(),
    type: z.lazy(() => JustificatifDossierSchema),
    link: z.string(),
    statut: z
      .lazy(() => STATUT_PIECESchema)
      .optional()
      .nullable(),
    dossier: z
      .lazy(() => DossierCreateNestedOneWithoutPiecesDossierInputObjectSchema)
      .optional(),
  })
  .strict();

export const PieceDossierCreateInputObjectSchema = Schema;
