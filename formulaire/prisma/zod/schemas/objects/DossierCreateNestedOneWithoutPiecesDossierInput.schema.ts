import { z } from 'zod';
import { DossierCreateWithoutPiecesDossierInputObjectSchema } from './DossierCreateWithoutPiecesDossierInput.schema';
import { DossierUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './DossierUncheckedCreateWithoutPiecesDossierInput.schema';
import { DossierCreateOrConnectWithoutPiecesDossierInputObjectSchema } from './DossierCreateOrConnectWithoutPiecesDossierInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateNestedOneWithoutPiecesDossierInput> =
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
      connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const DossierCreateNestedOneWithoutPiecesDossierInputObjectSchema =
  Schema;
