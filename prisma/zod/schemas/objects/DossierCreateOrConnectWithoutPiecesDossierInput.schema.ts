import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutPiecesDossierInputObjectSchema } from './DossierCreateWithoutPiecesDossierInput.schema';
import { DossierUncheckedCreateWithoutPiecesDossierInputObjectSchema } from './DossierUncheckedCreateWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutPiecesDossierInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DossierCreateWithoutPiecesDossierInputObjectSchema),
        z.lazy(
          () => DossierUncheckedCreateWithoutPiecesDossierInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DossierCreateOrConnectWithoutPiecesDossierInputObjectSchema =
  Schema;
