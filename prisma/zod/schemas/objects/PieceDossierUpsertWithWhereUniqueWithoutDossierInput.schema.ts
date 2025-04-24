import { z } from 'zod';
import { PieceDossierWhereUniqueInputObjectSchema } from './PieceDossierWhereUniqueInput.schema';
import { PieceDossierUpdateWithoutDossierInputObjectSchema } from './PieceDossierUpdateWithoutDossierInput.schema';
import { PieceDossierUncheckedUpdateWithoutDossierInputObjectSchema } from './PieceDossierUncheckedUpdateWithoutDossierInput.schema';
import { PieceDossierCreateWithoutDossierInputObjectSchema } from './PieceDossierCreateWithoutDossierInput.schema';
import { PieceDossierUncheckedCreateWithoutDossierInputObjectSchema } from './PieceDossierUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierUpsertWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => PieceDossierUpdateWithoutDossierInputObjectSchema),
        z.lazy(
          () => PieceDossierUncheckedUpdateWithoutDossierInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => PieceDossierCreateWithoutDossierInputObjectSchema),
        z.lazy(
          () => PieceDossierUncheckedCreateWithoutDossierInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierUpsertWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
