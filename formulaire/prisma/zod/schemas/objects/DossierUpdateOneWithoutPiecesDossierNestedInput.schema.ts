import { z } from 'zod';
import { DossierCreateWithoutPiecesDossierInputObjectSchema } from './DossierCreateWithoutPiecesDossierInput.schema';
import { DossierUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './DossierUncheckedCreateWithoutPiecesDossierInput.schema';
import { DossierCreateOrConnectWithoutPiecesDossierInputObjectSchema } from './DossierCreateOrConnectWithoutPiecesDossierInput.schema';
import { DossierUpsertWithoutPiecesDossierInputObjectSchema } from './DossierUpsertWithoutPiecesDossierInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutPiecesDossierInputObjectSchema } from './DossierUpdateWithoutPiecesDossierInput.schema';
import { DossierUncheckedUpdateWithoutPiecesDossierInputObjectSchema } from './DossierUncheckedUpdateWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateOneWithoutPiecesDossierNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutPiecesDossierInputObjectSchema),
          z.lazy(
            () => DossierUncheckedCreateWithoutPiecesDossierInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DossierCreateOrConnectWithoutPiecesDossierInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => DossierUpsertWithoutPiecesDossierInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DossierUpdateWithoutPiecesDossierInputObjectSchema),
          z.lazy(
            () => DossierUncheckedUpdateWithoutPiecesDossierInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const DossierUpdateOneWithoutPiecesDossierNestedInputObjectSchema =
  Schema;
