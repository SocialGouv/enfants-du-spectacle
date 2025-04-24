import { z } from 'zod';
import { DossierUpdateWithoutPiecesDossierInputObjectSchema } from './DossierUpdateWithoutPiecesDossierInput.schema';
import { DossierUncheckedUpdateWithoutPiecesDossierInputObjectSchema } from './DossierUncheckedUpdateWithoutPiecesDossierInput.schema';
import { DossierCreateWithoutPiecesDossierInputObjectSchema } from './DossierCreateWithoutPiecesDossierInput.schema';
import { DossierUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './DossierUncheckedCreateWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithoutPiecesDossierInput> = z
  .object({
    update: z.union([
      z.lazy(() => DossierUpdateWithoutPiecesDossierInputObjectSchema),
      z.lazy(() => DossierUncheckedUpdateWithoutPiecesDossierInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DossierCreateWithoutPiecesDossierInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutPiecesDossierInputObjectSchema),
    ]),
  })
  .strict();

export const DossierUpsertWithoutPiecesDossierInputObjectSchema = Schema;
