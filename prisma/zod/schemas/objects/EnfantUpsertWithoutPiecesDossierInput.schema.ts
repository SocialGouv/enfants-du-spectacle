import { z } from 'zod';
import { EnfantUpdateWithoutPiecesDossierInputObjectSchema } from './EnfantUpdateWithoutPiecesDossierInput.schema';
import { EnfantUncheckedUpdateWithoutPiecesDossierInputObjectSchema } from './EnfantUncheckedUpdateWithoutPiecesDossierInput.schema';
import { EnfantCreateWithoutPiecesDossierInputObjectSchema } from './EnfantCreateWithoutPiecesDossierInput.schema';
import { EnfantUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpsertWithoutPiecesDossierInput> = z
  .object({
    update: z.union([
      z.lazy(() => EnfantUpdateWithoutPiecesDossierInputObjectSchema),
      z.lazy(() => EnfantUncheckedUpdateWithoutPiecesDossierInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => EnfantCreateWithoutPiecesDossierInputObjectSchema),
      z.lazy(() => EnfantUncheckedCreateWithoutPiecesDossierInputObjectSchema),
    ]),
  })
  .strict();

export const EnfantUpsertWithoutPiecesDossierInputObjectSchema = Schema;
