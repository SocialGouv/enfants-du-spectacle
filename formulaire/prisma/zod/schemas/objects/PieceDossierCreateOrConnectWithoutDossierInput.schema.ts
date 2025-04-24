import { z } from 'zod';
import { PieceDossierWhereUniqueInputObjectSchema } from './PieceDossierWhereUniqueInput.schema';
import { PieceDossierCreateWithoutDossierInputObjectSchema } from './PieceDossierCreateWithoutDossierInput.schema';
import { PieceDossierUncheckedCreateWithoutDossierInputObjectSchema } from './PieceDossierUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierCreateOrConnectWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => PieceDossierCreateWithoutDossierInputObjectSchema),
        z.lazy(
          () => PieceDossierUncheckedCreateWithoutDossierInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierCreateOrConnectWithoutDossierInputObjectSchema =
  Schema;
