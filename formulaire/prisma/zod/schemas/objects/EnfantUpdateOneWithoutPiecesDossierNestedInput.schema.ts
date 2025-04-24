import { z } from 'zod';
import { EnfantCreateWithoutPiecesDossierInputObjectSchema } from './EnfantCreateWithoutPiecesDossierInput.schema';
import { EnfantUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutPiecesDossierInput.schema';
import { EnfantCreateOrConnectWithoutPiecesDossierInputObjectSchema } from './EnfantCreateOrConnectWithoutPiecesDossierInput.schema';
import { EnfantUpsertWithoutPiecesDossierInputObjectSchema } from './EnfantUpsertWithoutPiecesDossierInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithoutPiecesDossierInputObjectSchema } from './EnfantUpdateWithoutPiecesDossierInput.schema';
import { EnfantUncheckedUpdateWithoutPiecesDossierInputObjectSchema } from './EnfantUncheckedUpdateWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateOneWithoutPiecesDossierNestedInput> =
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
      upsert: z
        .lazy(() => EnfantUpsertWithoutPiecesDossierInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => EnfantWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => EnfantUpdateWithoutPiecesDossierInputObjectSchema),
          z.lazy(
            () => EnfantUncheckedUpdateWithoutPiecesDossierInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const EnfantUpdateOneWithoutPiecesDossierNestedInputObjectSchema =
  Schema;
