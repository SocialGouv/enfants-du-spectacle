import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantCreateWithoutPiecesDossierInputObjectSchema } from './EnfantCreateWithoutPiecesDossierInput.schema';
import { EnfantUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateOrConnectWithoutPiecesDossierInput> =
  z
    .object({
      where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => EnfantCreateWithoutPiecesDossierInputObjectSchema),
        z.lazy(
          () => EnfantUncheckedCreateWithoutPiecesDossierInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const EnfantCreateOrConnectWithoutPiecesDossierInputObjectSchema =
  Schema;
