import { z } from 'zod';
import { EnfantCreateWithoutPiecesDossierInputObjectSchema } from './EnfantCreateWithoutPiecesDossierInput.schema';
import { EnfantUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutPiecesDossierInput.schema';
import { EnfantCreateOrConnectWithoutPiecesDossierInputObjectSchema } from './EnfantCreateOrConnectWithoutPiecesDossierInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateNestedOneWithoutPiecesDossierInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EnfantCreateWithoutPiecesDossierInputObjectSchema),
          z.lazy(
            () => EnfantUncheckedCreateWithoutPiecesDossierInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => EnfantCreateOrConnectWithoutPiecesDossierInputObjectSchema)
        .optional(),
      connect: z.lazy(() => EnfantWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const EnfantCreateNestedOneWithoutPiecesDossierInputObjectSchema =
  Schema;
